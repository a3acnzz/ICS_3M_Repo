package com.mmm

import ch.silviowangler.grails.icalender.ICalendarBuilder
import grails.plugin.asyncmail.AsynchronousMailAttachment
import grails.plugin.asyncmail.AsynchronousMailMessage
import grails.plugin.asyncmail.AsynchronousMailService
import net.fortuna.ical4j.model.Property
import net.fortuna.ical4j.model.TimeZoneRegistry
import net.fortuna.ical4j.model.TimeZoneRegistryFactory
import net.fortuna.ical4j.model.component.VEvent
import net.fortuna.ical4j.model.component.VTimeZone
import net.fortuna.ical4j.model.parameter.FmtType
import net.fortuna.ical4j.model.property.Clazz
import net.fortuna.ical4j.model.property.XProperty

import java.sql.Time
import java.text.SimpleDateFormat

class IcsMailService {

	AsynchronousMailService asyncMailService

	def sendEmail(Long appointmentId, String emailType) {

		println "Inside IcsMailService"
		println appointmentId
		println emailType

		// Objects needed for building email message and ICS file
		AppointmentDetailsView appointmentDetails = AppointmentDetailsView.get(appointmentId)

		println appointmentDetails

		if(!appointmentDetails) {
			return null
		}

		Location location = Location.load(appointmentDetails.locationId)
		Program program = Program.load(appointmentDetails.programId)
		Appointment appointment = Appointment.load(appointmentId)

		println location
		println program
		println appointment

		// Get email template in one query
		def emailTemplate = EmailTemplate.createCriteria().list {
			// Specify email type, confirmation or cancellation
			eq("templateType", emailType)
			// Specify email must be active
			eq("active", true)
			and {
				or {
					// Program-specific template
					eq("program", program)
					// Location-specific template
					and {
						isNull("program")
						eq("location", location)
					}
					// System template
					and {
						isNull("program")
						isNull("location")
					}
				}
			}
			projections {
				property("subject")
				property("message")
			}
			// Order results by system -> location > Program
			order("program")
			order("location")
		}

		println "Get email template in one query"
		println emailTemplate

		// Variables for email subject and message
		String emailSubject = ''
		String emailMessage = ''

		// Concatenate email templates in system -> location -> program order
		emailTemplate.collect { it ->
			emailSubject += it[0] + ' '
			emailMessage += it[1]
		}

		println "Concatenate email templates in system -> location -> program order"
		println emailTemplate

		// Variables for personalized email subject and message
		String firstName = appointmentDetails.firstName
		String lastName = appointmentDetails.lastName
		String programName = appointmentDetails.programName
		Date date = appointmentDetails.programDate
		String startTimeDisplay = appointmentDetails.startTimeDisplay
		String endTimeDisplay = appointmentDetails.endTimeDisplay
		Time startTime = appointmentDetails.startTime
		Time endTime = appointmentDetails.endTime

		println "Printing Appointment details again:"
		println appointmentDetails

		// Replace personalized variables in email template
		SimpleDateFormat sdfDisplay = new SimpleDateFormat('EEEE, MMMM dd, yyyy')
		String formattedProgramDateDisplay = sdfDisplay.format(date)

		println "Date Formatting:"
		println date
		println formattedProgramDateDisplay

		emailSubject = emailSubject.replaceAll('firstName', firstName)
		emailSubject = emailSubject.replaceAll('lastName', lastName)
		emailSubject = emailSubject.replaceAll('programName', programName)
		emailSubject = emailSubject.replaceAll('programDate', formattedProgramDateDisplay)
		emailSubject = emailSubject.replaceAll('startTime', startTimeDisplay)
		emailSubject = emailSubject.replaceAll('endTime', endTimeDisplay)

		emailMessage = emailMessage.replaceAll('firstName', firstName)
		emailMessage = emailMessage.replaceAll('lastName', lastName)
		emailMessage = emailMessage.replaceAll('programName', programName)
		emailMessage = emailMessage.replaceAll('programDate', formattedProgramDateDisplay)
		emailMessage = emailMessage.replaceAll('startTime', startTimeDisplay)
		emailMessage = emailMessage.replaceAll('endTime', endTimeDisplay)

		println "After replace all:"
		println emailSubject
		println emailMessage

		// Get BCC emails
		List<String> bccEmails = getBccEmails(location, program)

		print "bccEmails:"
		println bccEmails

		// Create formatted start and end time for ICS file
		SimpleDateFormat sdf = new SimpleDateFormat('yyyy-MM-dd')
		String formattedProgramDate = sdf.format(date)
		String icsStartDateTime = formattedProgramDate + " " + startTime
		String icsEndDateTime = formattedProgramDate + " " + endTime

		println formattedProgramDate
		println icsStartDateTime
		println icsEndDateTime

		// Create summary (file name) for ICS file
		String summary = emailType?.equalsIgnoreCase(AppConstant.EMAIL_TYPE_CONFIRM) ? AppConstant.APPOINTMENT : emailType
		summary += " - " + appointmentDetails.programName

		println "Summary:"
		println summary

		// wrap this in cancellation type email to prevent unneeded queries during registration (x)
		// Details for cancellation ICS file
		def UID = ''
		AsynchronousMailAttachment attachment = null
		if (emailType?.equalsIgnoreCase(AppConstant.EMAIL_TYPE_CANCEL)) {
			println "Going inside attachment if"
			AppointmentMessage appointmentMessage = AppointmentMessage.findByAppointment(appointment)
			AsynchronousMailMessage asyncMailMsg = AsynchronousMailMessage.findById(appointmentMessage?.getMessageId())
			attachment = AsynchronousMailAttachment.findByMessage(asyncMailMsg)
			println appointmentMessage
			println asyncMailMsg
			println attachment
			if (attachment) {
				UID = extractUIDFromICS(attachment)
				print "UID:"
				println UID
			}
			if (appointmentMessage) {
				println "Going inside appointmentMessage"
				appointmentMessage.delete()
			}
		}

		def builder = new ICalendarBuilder()
		if (emailType?.equalsIgnoreCase(AppConstant.EMAIL_TYPE_CONFIRM)) {
			println "Going inside builder if"
			builder.calendar() {
				events {
					event(
							start: Date.parse('yyyy-MM-dd HH:mm', icsStartDateTime),
							end: Date.parse('yyyy-MM-dd HH:mm', icsEndDateTime),
							summary: summary,
							timezone: appointmentDetails.timeZone,
							location: appointmentDetails.venue
							) {
								reminder(minutesBefore: 30, description: summary)
							}
				}
			}
		} else if (emailType.equalsIgnoreCase(AppConstant.EMAIL_TYPE_CANCEL) && (attachment != null)) {
			println "Going inside builder else"
			builder.calendar(method: 'CANCEL') {
				events {
					event(
							start: Date.parse('yyyy-MM-dd HH:mm', icsStartDateTime),
							end: Date.parse('yyyy-MM-dd HH:mm', icsEndDateTime),
							summary: summary,
							sequence: 12, //It is a random number; should be greater than the sequence in the ICS file selected for cancellation
							uid: UID,
							timezone: appointmentDetails.timeZone,
							location: appointmentDetails.venue,
							method: 'CANCEL',
							status: 'CANCELLED'
							)
				}
			}
		}

		println "Builder:"
		println builder

		VEvent vEvent = (VEvent) builder?.cal?.getComponent(VEvent.VEVENT)
		println vEvent
		if (vEvent != null) {
			println "vEvent is not null"
			// Remove ORGANIZER property from ICS file, so Outlook treats it as an appointment
			vEvent.getProperties().remove(vEvent.getProperty(Property.ORGANIZER))

			if (emailType.equalsIgnoreCase(AppConstant.EMAIL_TYPE_CONFIRM)) {
				// Set ICS file to private
				vEvent.getProperties().add(new Clazz("PRIVATE"))
			}

			// Set ICS body as email message body
			XProperty bodyProperty = new XProperty("X-ALT-DESC")
			bodyProperty.getParameters().add(new FmtType("text/html"))
			bodyProperty.setValue(emailMessage)
			vEvent.getProperties().add(bodyProperty)
			println bodyProperty
		}

		// Add time zone to ICS file
		TimeZoneRegistry registry = TimeZoneRegistryFactory.getInstance().createRegistry()
		VTimeZone tz = registry.getTimeZone(appointmentDetails.timeZone).getVTimeZone()
		builder?.cal?.getComponents()?.add(tz)

		println "Add time zone to ICS file"
		println registry
		println tz

		AsynchronousMailMessage message = asyncMailService.sendMail {
			// Mail parameters
			to appointmentDetails.emailAddress
			from AppConstant.EMAIL_SENDER
			subject emailSubject
			html emailMessage
			if (builder?.cal) {
				attachBytes summary + ".ics", 'text/calendar', builder.cal.toString().getBytes('UTF-8')
			}
			if (bccEmails) {
				bcc bccEmails
			}
		}
		println "After send mail function"
		println appointmentDetails.emailAddress
		println AppConstant.EMAIL_SENDER
		println emailSubject
		println emailMessage
		println message
		
		if (emailType.equalsIgnoreCase(AppConstant.EMAIL_TYPE_CONFIRM)) {
			println "Inside Condirm type"
			//Add an entry to AppointmentMessage table to map the appointment with corresponding email message
			AppointmentMessage apptMessage = new AppointmentMessage()
			apptMessage.setMessageId(message?.getId())
			apptMessage.setAppointment(appointment)
			apptMessage.save()
			
			println apptMessage
		}
	}

	def extractUIDFromICS(AsynchronousMailAttachment attachment) {
		def icsString = new String(attachment?.getContent())
		String[] icsParams = icsString.split("\r\n")
		def icsParameter = ''
		for (int i = 0; i < icsParams.length; i++) {
			icsParameter = icsParams[i]
			if (icsParameter.startsWith('UID')) {
				return icsParameter.substring(icsParameter.indexOf(':') + 1, icsParameter.length())
			}
		}
	}

	def getBccEmails(Location location, Program program) {
		return BccEmail.createCriteria().list {
			or {
				eq("program", program)
				and {
					eq("location", location)
					isNull("program")
				}
				and {
					isNull("location")
					isNull("program")
				}
			}
			projections {
				property("email")
			}
		}
	}
}