package com.mmm

import com.google.gson.JsonObject
import com.mmm.AppConstant
import com.mmm.auth.CustomUserDetail
import com.mmm.auth.UnauthorizedException
import grails.plugin.springsecurity.SpringSecurityService
import grails.transaction.Transactional
import groovy.json.JsonSlurper
import org.grails.web.json.JSONObject
import org.hibernate.sql.JoinType

@Transactional
class AppointmentService {

	SpringSecurityService springSecurityService
	IcsMailService icsMailService
	ProgramOwnerService programOwnerService

	def search(String firstName, String lastName, String emailAddress, String pin, Long timeSlotId) {
		List<Appointment> results = Appointment.createCriteria().list() {
			firstName = firstName?.trim()
			lastName = lastName?.trim()
			emailAddress = emailAddress?.trim()
			pin = pin?.trim()

			if (firstName != null) {
				ilike("firstName", "%" + firstName + "%")
			}
			if (lastName != null) {
				ilike("lastName", "%" + lastName + "%")
			}
			if (emailAddress != null) {
				ilike("email", "%" + emailAddress + "%")
			}
			if (pin != null) {
				ilike("pin", "%" + pin + "%")
			}
			if (timeSlotId != null) {
				eq("timeSlot.id", timeSlotId)
			}
		}
		return results
	}

	def getUser(userName) {
		def user = SignUpUser.findByUserPin(userName)
		if (!user)
			user = IcsUser.findByUserPin(userName)
		if (!user)
			throw new UnauthorizedException()
		return user
	}

	@Transactional(readOnly = true)
	def getUserAppointments() {
		def appointments = []
		def user = getUser(springSecurityService.principal?.username)
		String emailAddress = user.email?.trim()
		String pin = user.userPin?.trim()

		List<MyAppointmentsView> results = MyAppointmentsView.withCriteria {
			or {
				eq('emailAddress', emailAddress)
				eq('pin', pin)
				eq('createdBy', pin)
			}
			and {
				eq('archived', false)
			}
		}

		for (appointment in results) {
			appointments.push(appointment.toJson())
		}

		return appointments
	}

	@Transactional
	protected managePendingAppointment(def json) {
		if (json?.size() == 0) {
			return null
		}

		List managePendingAppointments = new ArrayList()

		String userName = springSecurityService.principal?.username

		if(json.pendingAppointmentInsertedId) {
			PendingAppointment existingPendingAppointment = PendingAppointment.findByIdAndCreatedBy(json.pendingAppointmentInsertedId, userName)
			if(existingPendingAppointment) {
				existingPendingAppointment?.delete()
			}
		}

		if (json.existingTimeSlotId) {
			TimeSlot existingTimeSlot = TimeSlot.load(json.existingTimeSlotId)
			PendingAppointment existingPendingAppointment = PendingAppointment.findByTimeSlotAndCreatedBy(existingTimeSlot, userName, [max: 1, sort: "dateCreated", order: "desc"])

			if(existingPendingAppointment) {
				existingPendingAppointment?.delete()
			}
		}

		if (json.requestedTimeSlotId) {
			PendingAppointment pendingAppointment = new PendingAppointment()
			pendingAppointment.timeSlot = TimeSlot.load(json.requestedTimeSlotId)
			pendingAppointment.createdBy = userName
			PendingAppointment insertedInstance = pendingAppointment.save()
			if(insertedInstance) {
				managePendingAppointments.push(insertedInstance)
			}
		}

		managePendingAppointments.push(json)

		return managePendingAppointments
	}

	@Transactional
	protected getPendingAppointments(Long programId) {
		Program program = Program.load(programId)

		// Check that user is authorized to list pending appointments for the program
		if (!programOwnerService.programOwnerAuthorized(program.locationId)) {
			return []
		}

		List<PendingAppointment> pendingAppointmentList = PendingAppointment.withCriteria {
			createAlias('timeSlot', 'ts', JoinType.INNER_JOIN)
			createAlias('ts.programDate', 'pd', JoinType.INNER_JOIN)
			createAlias('pd.program', 'pr', JoinType.INNER_JOIN)
			eq('pr.id', programId)
			order('pd.date')
			order('ts.startTime')
		}

		if (!pendingAppointmentList) {
			return []
		}

		def createdByList = pendingAppointmentList.collect { it.createdBy }.unique()
		def createdByUserList = SignUpUser.findAllByUserPinInList(createdByList)
		createdByUserList += IcsUser.findAllByUserPinInList(createdByList)

		return pendingAppointmentList.collect {
			[
				id              : it.id,
				startTimeDisplay: it.timeSlot.startTimeDisplay,
				endTimeDisplay  : it.timeSlot.endTimeDisplay,
				date            : it.timeSlot.programDate.date,
				firstName       : createdByUserList.find { element -> element.userPin == it.createdBy }?.firstName,
				lastName        : createdByUserList.find { element -> element.userPin == it.createdBy }?.lastName,
				createdBy       : it.createdBy,
				dateCreated     : it.dateCreated
			]
		}
	}

	@Transactional
	protected clearPendingAppointment(def json) {
		if (json?.size() == 0) {
			return null
		}

		PendingAppointment pendingAppointment = PendingAppointment.load(json.pendingAppointmentId)

		// Check that user is authorized to clear the pending appointment
		if (!programOwnerService.programOwnerAuthorized(pendingAppointment.timeSlot.programDate.program.locationId)) {
			return []
		}

		pendingAppointment.delete()
		return ['Pending appointment cleared']
	}

	@Transactional
	protected save(def json) {
		if (json?.size() == 0) {
			return null
		}

		String userName = springSecurityService.principal?.username

		for (appt in json) {
			Appointment submittedAppointment = new Appointment(appt)
			TimeSlot timeSlot = TimeSlot.load(appt.timeSlotId)
			submittedAppointment.timeSlot = timeSlot
			Appointment appointment

			if(appt.pendingAppointmentInsertedId) {
				PendingAppointment existingPendingAppointment = PendingAppointment.findByIdAndCreatedBy(appt.pendingAppointmentInsertedId, userName)
				if(existingPendingAppointment) {
					existingPendingAppointment?.delete()
				}
			}

			if (appt.id) {
				appointment = Appointment.get(appt.id)
			}
			if (!appointment) {
				appointment = new Appointment()
				appointment.createdBy = userName
			}

			appointment.lastUpdatedBy = userName
			appointment.copy(submittedAppointment)
			if (appointment.save() && appointment.emailAddress) {
				icsMailService.sendEmail(appointment.id, AppConstant.EMAIL_TYPE_CONFIRM)
			}
		}
		return [status: 'complete']
	}

	@Transactional
	protected cancel(def json) {
		if (json?.size() == 0) {
			return null
		}

		Appointment appointment = Appointment.get(json.appointmentId)

		if (appointment && appointmentAuthorized(appointment) ) {
			if (appointment.emailAddress) {
				icsMailService.sendEmail(appointment.id, AppConstant.EMAIL_TYPE_CANCEL)
			}
			appointment.delete()
			return [status: 'success']
		}
		return null
	}

	@Transactional
	protected reschedule(def json) {
		if (json?.size() == 0) {
			return null
		}

		cancel(json.oldAppointment)
		save(json.newAppointment)
	}

	@Transactional(readOnly = true)
	def getAppointment(Long id) {
		Appointment appointment
		if (id) {
			appointment = Appointment.get(id)
		}
		if (!appointment) {
			appointment = new Appointment()
		}

		if (appointmentAuthorized(appointment)) {
			return appointment?.toJson()
		} else {
			throw new UnauthorizedException()
		}
	}

	@Transactional(readOnly = true)
	def validateAppointments(def json) {
		if (json?.size() == 0) {
			return null
		}

		List invalidAppointments = new ArrayList()

		for (appt in json) {
			Appointment submittedAppointment = new Appointment(appt)
			Long programId = appt.programId

			def List<ProgramAppointmentView> programAppointment = ProgramAppointmentView.withCriteria {
				eq('programId', programId)
				ge('programDate', new Date().clearTime())
				eq('firstName', submittedAppointment.firstName)
				eq('lastName', submittedAppointment.lastName)
				eq('emailAddress', submittedAppointment.emailAddress)
				eq('archived', false)
			}

			if (programAppointment) {
				if(programAppointment.size() > 0) {
					def ProgramAppointmentView appointment = programAppointment.get(0)
					for(ProgramAppointmentView element: programAppointment) {
						if(element.appointmentId > appointment.appointmentId) {
							appointment = element
						}
					}

					long availableAppointmentInFormCount = checkDuplicateAppointmentsAndCount(json, appt.programId, appt.firstName, appt.lastName)
					if( (appointment.maxAppointmentsPerUser - programAppointment.size() <= 0) || (appointment.maxAppointmentsPerUser - programAppointment.size() < availableAppointmentInFormCount) ) {
						invalidAppointments.push(appt)
					}
				}
			}
		}

		return invalidAppointments
	}

	private checkDuplicateAppointmentsAndCount(appointments , programId, firstName, lastName) {
		long availableAppointmentInFormCount = 0;

		for (int i = 0; i < appointments.length(); i++) {
			if (appointments[i].programId == programId &&
			appointments[i].firstName == firstName &&
			appointments[i].lastName == lastName) {
				availableAppointmentInFormCount++;
			}
		}

		return availableAppointmentInFormCount;
	}

	//backup
	//	@Transactional(readOnly = true)
	//	def validateAppointments(def json) {
	//		if (json?.size() == 0) {
	//			return null
	//		}
	//
	//		List<Appointment> invalidAppointments = new ArrayList()
	//
	//		for (appt in json) {
	//			Appointment submittedAppointment = new Appointment(appt)
	//			Long programId = appt.programId
	//
	//			def List<ProgramAppointmentView> programAppointment = ProgramAppointmentView.withCriteria {
	//				eq('programId', programId)
	//				ge('programDate', new Date().clearTime())
	//				eq('firstName', submittedAppointment.firstName)
	//				eq('lastName', submittedAppointment.lastName)
	//				eq('emailAddress', submittedAppointment.emailAddress)
	//				eq('archived', false)
	//			}
	//
	//			if (programAppointment && programAppointment.size() > 0) {
	//				def ProgramAppointmentView appointment = programAppointment.get(0)
	//				for(ProgramAppointmentView element: programAppointment) {
	//					if(element.appointmentId > appointment.appointmentId) {
	//						appointment = element
	//					}
	//				}
	//				if( (appointment.maxAppointmentsPerUser - programAppointment.size()) <= 0 ) {
	//					Appointment invalidAppointment = Appointment.get(appointment.appointmentId)
	//
	//					if (invalidAppointment) {
	//						invalidAppointments.push(invalidAppointment)
	//					}
	//				}
	//			}
	//		}
	//
	//		return invalidAppointments
	//	}

	@Transactional(readOnly = true)
	def validateTimeSlots(def json) {
		if (json?.size() == 0) {
			return null
		}
		def invalidAppointments = []

		for (appt in json) {
			Appointment submittedAppointment = new Appointment(appt)
			JSONObject jsonObject = new JSONObject(appt);
			Long timeSlotId = jsonObject.getLong("timeSlotId");
			TimeSlot timeSlot = TimeSlot.get(timeSlotId)
			if(!( timeSlot.maxAppointments > Appointment.countByTimeSlot(timeSlot)) ){
				submittedAppointment.timeSlot = timeSlot
				invalidAppointments.push(submittedAppointment.toJson())
			}
		}
		return invalidAppointments
	}


	@Transactional(readOnly = true)
	protected appointmentAuthorized(Appointment appointment) {
		CustomUserDetail user = springSecurityService?.principal
		def checkUser = SignUpUser.findByUserPin(user?.username)
		if (!checkUser) {
			checkUser = IcsUser.get(user?.username)
		}

		if (appointment.emailAddress == checkUser.email.trim() || appointment.pin == checkUser.userPin.trim() || appointment.createdBy == checkUser.userPin.trim()) {
			return true
		} else {
			return programOwnerService.programOwnerAuthorized(appointment.timeSlot.programDate.program.locationId)
		}
	}

	@Transactional
	def alreadySavedAppointments(Long programId, String firstName, String lastName) {
		if(programId && firstName && lastName) {
			def List<ProgramAppointmentView> programAppointment = ProgramAppointmentView.withCriteria {
				eq('programId', programId)
				ge('programDate', new Date().clearTime())
				eq('firstName', firstName)
				eq('lastName', lastName)
			}

			if (programAppointment) {
				if(programAppointment.size() > 0) {
					return [size: programAppointment.size()]
				}
			} else {
				return [size: 0]
			}
		} else {
			return null
		}
	}

}
