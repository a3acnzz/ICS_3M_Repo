package e2e

import com.mmm.Announcement
import com.mmm.Appointment
import com.mmm.BccEmail
import com.mmm.ContactUs
import com.mmm.EmailTemplate
import com.mmm.Location
import com.mmm.IcsUser
import com.mmm.PendingAppointment
import com.mmm.Program
import com.mmm.ProgramDate
import com.mmm.ProgramOwner
import com.mmm.TimeSlot
import grails.transaction.Transactional
import java.sql.Time

@Transactional
class E2EService {

    private static final TEST_ADMIN = 'TEST_ADMIN'

    @Transactional
    def prepareLocationAnnouncement() {
        deleteLocation('E2E-LOC-ANNOUNCE')

        new Location(
                name: 'E2E - Location - Announcement',
                code: 'E2E-LOC-ANNOUNCE',
                timeZone: TimeZone.getTimeZone('America/Chicago'),
                active: true,
                showInSignUpList: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()
        return [message: 'OK']
    }

    @Transactional
    def cleanupLocationAnnouncement() {
        deleteLocation('E2E-LOC-ANNOUNCE')
        return [message: 'OK']
    }

    @Transactional
    def prepareLocationBccEmails() {
        deleteLocation('E2E-LOC-BCC')

        new Location(
                name: 'E2E - Location - BCC Emails',
                code: 'E2E-LOC-BCC',
                timeZone: TimeZone.getTimeZone('America/Chicago'),
                active: true,
                showInSignUpList: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()
        return [message: 'OK']
    }

    @Transactional
    def cleanupLocationBccEmails() {
        deleteLocation('E2E-LOC-BCC')
        return [message: 'OK']
    }

    @Transactional
    def prepareLocationContactUs() {
        deleteLocation('E2E-LOC-CONTACT')

        new Location(
                name: 'E2E - Location - Contact Us',
                code: 'E2E-LOC-CONTACT',
                timeZone: TimeZone.getTimeZone('America/Chicago'),
                active: true,
                showInSignUpList: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()
        return [message: 'OK']
    }

    @Transactional
    def cleanupLocationContactUs() {
        deleteLocation('E2E-LOC-CONTACT')
        return [message: 'OK']
    }

    @Transactional
    def prepareSystemBccEmails() {
        BccEmail.findAllByLocationAndProgram(null, null).each { it ->
            it.delete(flush: true)
        }
        return [message: 'OK']
    }

    @Transactional
    def cleanupSystemBccEmails() {
        BccEmail.findAllByLocationAndProgram(null, null).each { it ->
            it.delete(flush: true)
        }
        return [message: 'OK']
    }

    @Transactional
    def prepareEmailTemplates() {
        EmailTemplate.findAllByLocationAndProgram(null, null).each { it ->
            it.delete(flush: true)
        }

        deleteLocation('E2E-ET')

        def location = new Location(
                name: 'E2E - Email Templates',
                code: 'E2E-ET',
                timeZone: TimeZone.getTimeZone('America/Chicago'),
                active: true,
                showInSignUpList: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()

        new Program(name: 'E2E - Program - Email Templates',
                location: location,
                venue: 'E2E Test',
                active: true,
                emailRequired: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()

        return [message: 'OK']
    }

    @Transactional
    def cleanupEmailTemplates() {
        EmailTemplate.findAllByLocationAndProgram(null, null).each { it ->
            it.delete(flush: true)
        }

        new EmailTemplate(
                location: null,
                program: null,
                templateType: 'Confirmation',
                subject: 'Appointment Confirmation',
                message: '<p>Your appointment has been created.</p>',
                active: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()

        new EmailTemplate(
                location: null,
                program: null,
                templateType: 'Cancellation',
                subject: 'Appointment Cancellation',
                message: '<p>Your appointment has been cancelled.</p>',
                active: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()

        deleteLocation('E2E-ET')

        return [message: 'OK']
    }

    @Transactional
    def prepareAdminManageAdmin() {
        new IcsUser(
                userPin: 'E2E_ADMIN',
                firstName: 'E2E',
                lastName: 'Admin',
                email: 'mistest@mmm.com')
                .save()
        return [message: 'OK']
    }

    @Transactional
    def cleanupAdminManageAdmin() {
        IcsUser.findByUserPin('E2E_Admin').delete(flush: true)
        return [message: 'OK']
    }

    @Transactional
    def cleanupAdminLocation() {
        deleteLocation('E2E')
        return [message: 'OK']
    }

    @Transactional
    def prepareProgramOwnerLocation() {
        deleteLocation('E2E-PO')

        new Location(
                name: 'E2E Program Owner',
                code: 'E2E-PO',
                timeZone: TimeZone.getTimeZone('America/Chicago'),
                active: true,
                showInSignUpList: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()
        return [message: 'OK']
    }

    @Transactional
    def cleanupProgramOwnerLocation() {
        deleteLocation('E2E-PO')
        return [message: 'OK']
    }

    @Transactional
    def prepareSignUpNoProgram() {
        deleteLocation('E2E-SU-NP')

        new Location(
                name: 'E2E - Sign Up - No Program',
                code: 'E2E-SU-NP',
                timeZone: TimeZone.getTimeZone('America/Chicago'),
                active: true,
                showInSignUpList: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()
        return [message: 'OK']
    }

    @Transactional
    def cleanupSignUpNoProgram() {
        deleteLocation('E2E-SU-NP')
        return [message: 'OK']
    }

    @Transactional
    def prepareSignUpNoProgramDates() {
        deleteLocation('E2E-SU-NPD')

        def location = new Location(
                name: 'E2E - Sign Up - No Program Dates',
                code: 'E2E-SU-NPD',
                timeZone: TimeZone.getTimeZone('America/Chicago'),
                active: true,
                showInSignUpList: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()

        new Program(name: 'E2E - Program - No Program Dates',
                location: location,
                venue: 'E2E Test',
                active: true,
                emailRequired: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()

        return [message: 'OK']
    }

    @Transactional
    def cleanupSignUpNoProgramDates() {
        deleteLocation('E2E-SU-NPD')
        return [message: 'OK']
    }

    @Transactional
    def prepareSignUpPastProgramDates() {
        deleteLocation('E2E-SU-PPD')

        def location = new Location(
                name: 'E2E - Sign Up - Past Program Dates',
                code: 'E2E-SU-PPD',
                timeZone: TimeZone.getTimeZone('America/Chicago'),
                active: true,
                showInSignUpList: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()

        def program = new Program(name: 'E2E - Program - Past Program Dates',
                location: location,
                venue: 'E2E Test',
                active: true,
                emailRequired: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()

        Date today = new Date()
        use(groovy.time.TimeCategory) {
            today = today - 6.hour
        }
        Date yesterday = today - 1
        Date twoDaysAgo = today - 2

        def program_date_01 = new ProgramDate(date: yesterday, program: program, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        def program_date_02 = new ProgramDate(date: twoDaysAgo, program: program, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()

        def time_01 = Time.valueOf('08:00:00')
        def time_02 = Time.valueOf('08:15:00')
        def time_03 = Time.valueOf('08:30:00')

        def timeDisplay_01 = '08:00 AM'
        def timeDisplay_02 = '08:15 AM'
        def timeDisplay_03 = '08:30 AM'

        new TimeSlot(startTime: time_01, endTime: time_02, startTimeDisplay: timeDisplay_01, endTimeDisplay: timeDisplay_02, maxAppointments: 1, programDate: program_date_01, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        new TimeSlot(startTime: time_02, endTime: time_03, startTimeDisplay: timeDisplay_02, endTimeDisplay: timeDisplay_03, maxAppointments: 1, programDate: program_date_01, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        new TimeSlot(startTime: time_01, endTime: time_02, startTimeDisplay: timeDisplay_01, endTimeDisplay: timeDisplay_02, maxAppointments: 5, programDate: program_date_02, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        new TimeSlot(startTime: time_02, endTime: time_03, startTimeDisplay: timeDisplay_02, endTimeDisplay: timeDisplay_03, maxAppointments: 5, programDate: program_date_02, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()


        return [message: 'OK']
    }

    @Transactional
    def cleanupSignUpPastProgramDates() {
        deleteLocation('E2E-SU-PPD')
        return [message: 'OK']
    }

    @Transactional
    def prepareSignUpNoTimeSlots() {
        deleteLocation('E2E-SU-NTS')

        def location = new Location(
                name: 'E2E - Sign Up - No Time Slots',
                code: 'E2E-SU-NTS',
                timeZone: TimeZone.getTimeZone('America/Chicago'),
                active: true,
                showInSignUpList: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()

        def program = new Program(name: 'E2E - Program - No Time Slots',
                location: location,
                venue: 'E2E Test',
                active: true,
                emailRequired: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()

        Date today = new Date()
        use(groovy.time.TimeCategory) {
            today = today - 6.hour
        }
        Date tomorrow = today + 1

        def program_date_01 = new ProgramDate(date: today, program: program, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        def program_date_02 = new ProgramDate(date: tomorrow, program: program, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()

        // TimeSlot with no availability
        def time_01 = Time.valueOf('08:00:00')
        def time_02 = Time.valueOf('08:15:00')

        def timeDisplay_01 = '08:00 AM'
        def timeDisplay_02 = '08:15 AM'

        def timeSlot_01 = new TimeSlot(startTime: time_01, endTime: time_02, startTimeDisplay: timeDisplay_01, endTimeDisplay: timeDisplay_02, maxAppointments: 1, programDate: program_date_01, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        new Appointment(timeSlot: timeSlot_01, firstName: 'E2E', lastName: 'Test', emailAddress: 'mistest@mmm.com', pin: '012345', archived: false, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()

        return [message: 'OK']
    }

    @Transactional
    def cleanupSignUpNoTimeSlots() {
        deleteLocation('E2E-SU-NTS')
        return [message: 'OK']
    }

    @Transactional
    def prepareSignUpProgram() {
        deleteLocation('E2E-SU-PRG')

        Appointment.findAllByCreatedBy(TEST_ADMIN). each { it.delete()}

        def location = new Location(
                name: 'E2E - Sign Up - Program',
                code: 'E2E-SU-PRG',
                timeZone: TimeZone.getTimeZone('America/Chicago'),
                active: true,
                showInSignUpList: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()

        def program = new Program(name: 'E2E - Program',
                location: location,
                venue: 'E2E Test',
                active: true,
                emailRequired: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()



        Date today = new Date()
        use(groovy.time.TimeCategory) {
            today = today - 6.hour
        }
        Date tomorrow = today + 1
        Date dayAfterTomorrow = today + 2

        def program_date_01 = new ProgramDate(date: tomorrow, program: program, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        def program_date_02 = new ProgramDate(date: dayAfterTomorrow, program: program, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()

        def time_01 = Time.valueOf('08:00:00')
        def time_02 = Time.valueOf('08:15:00')
        def time_03 = Time.valueOf('08:30:00')

        def timeDisplay_01 = '08:00 AM'
        def timeDisplay_02 = '08:15 AM'
        def timeDisplay_03 = '08:30 AM'

        new TimeSlot(startTime: time_01, endTime: time_02, startTimeDisplay: timeDisplay_01, endTimeDisplay: timeDisplay_02, maxAppointments: 1, programDate: program_date_01, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        new TimeSlot(startTime: time_02, endTime: time_03, startTimeDisplay: timeDisplay_02, endTimeDisplay: timeDisplay_03, maxAppointments: 1, programDate: program_date_01, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        new TimeSlot(startTime: time_01, endTime: time_02, startTimeDisplay: timeDisplay_01, endTimeDisplay: timeDisplay_02, maxAppointments: 5, programDate: program_date_02, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        new TimeSlot(startTime: time_02, endTime: time_03, startTimeDisplay: timeDisplay_02, endTimeDisplay: timeDisplay_03, maxAppointments: 5, programDate: program_date_02, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()

        return [message: 'OK']
    }

    @Transactional
    def cleanupSignUpProgram() {
        deleteLocation('E2E-SU-PRG')
        return [message: 'OK']
    }

    @Transactional
    def prepareManagePendingAppointment() {
        deleteLocation('E2E-MPA')

        def location = new Location(
                name: 'E2E - Manage Pending Appointment',
                code: 'E2E-MPA',
                timeZone: TimeZone.getTimeZone('America/Chicago'),
                active: true,
                showInSignUpList: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()

        def program = new Program(name: 'E2E - Program',
                location: location,
                venue: 'E2E Test',
                active: true,
                emailRequired: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()

        Date today = new Date()
        use(groovy.time.TimeCategory) {
            today = today - 6.hour
        }
        Date tomorrow = today + 1
        Date dayAfterTomorrow = today + 2

        def program_date_01 = new ProgramDate(date: tomorrow, program: program, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        def program_date_02 = new ProgramDate(date: dayAfterTomorrow, program: program, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()

        def time_01 = Time.valueOf('08:00:00')
        def time_02 = Time.valueOf('08:15:00')
        def time_03 = Time.valueOf('08:30:00')

        def timeDisplay_01 = '08:00 AM'
        def timeDisplay_02 = '08:15 AM'
        def timeDisplay_03 = '08:30 AM'

        new TimeSlot(startTime: time_01, endTime: time_02, startTimeDisplay: timeDisplay_01, endTimeDisplay: timeDisplay_02, maxAppointments: 1, programDate: program_date_01, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        new TimeSlot(startTime: time_02, endTime: time_03, startTimeDisplay: timeDisplay_02, endTimeDisplay: timeDisplay_03, maxAppointments: 1, programDate: program_date_01, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        new TimeSlot(startTime: time_01, endTime: time_02, startTimeDisplay: timeDisplay_01, endTimeDisplay: timeDisplay_02, maxAppointments: 5, programDate: program_date_02, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        new TimeSlot(startTime: time_02, endTime: time_03, startTimeDisplay: timeDisplay_02, endTimeDisplay: timeDisplay_03, maxAppointments: 5, programDate: program_date_02, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()

        return [message: 'OK']
    }

    @Transactional
    def cleanupManagePendingAppointment() {
        deleteLocation('E2E-MPA')
        return [message: 'OK']
    }

    @Transactional
    def prepareProgramAppointments() {
        deleteLocation('E2E-PAS')

        def location = new Location(
                name: 'E2E - Program Appointments',
                code: 'E2E-PAS',
                timeZone: TimeZone.getTimeZone('America/Chicago'),
                active: true,
                showInSignUpList: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()

        def program = new Program(name: 'E2E - Program',
                location: location,
                venue: 'E2E Test',
                active: true,
                emailRequired: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()

        Date today = new Date()
        use(groovy.time.TimeCategory) {
            today = today - 6.hour
        }

        Date dayBeforeYesterday = today - 2
        Date yesterday = today - 1
        Date tomorrow = today + 1
        Date dayAfterTomorrow = today + 2

        def program_date_01 = new ProgramDate(date: tomorrow, program: program, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        def program_date_02 = new ProgramDate(date: dayAfterTomorrow, program: program, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        def program_date_03 = new ProgramDate(date: yesterday, program: program, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        def program_date_04 = new ProgramDate(date: dayBeforeYesterday, program: program, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        def program_date_05 = new ProgramDate(date: today, program: program, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()

        def time_01 = Time.valueOf('08:00:00')
        def time_02 = Time.valueOf('08:15:00')
        def time_03 = Time.valueOf('08:30:00')

        def timeDisplay_01 = '08:00 AM'
        def timeDisplay_02 = '08:15 AM'
        def timeDisplay_03 = '08:30 AM'

        def timeslot_01 = new TimeSlot(startTime: time_01, endTime: time_02, startTimeDisplay: timeDisplay_01, endTimeDisplay: timeDisplay_02, maxAppointments: 1, programDate: program_date_01, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        def timeslot_02 = new TimeSlot(startTime: time_02, endTime: time_03, startTimeDisplay: timeDisplay_02, endTimeDisplay: timeDisplay_03, maxAppointments: 1, programDate: program_date_02, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        def timeslot_03 = new TimeSlot(startTime: time_01, endTime: time_02, startTimeDisplay: timeDisplay_01, endTimeDisplay: timeDisplay_02, maxAppointments: 1, programDate: program_date_03, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        def timeslot_04 = new TimeSlot(startTime: time_02, endTime: time_03, startTimeDisplay: timeDisplay_02, endTimeDisplay: timeDisplay_03, maxAppointments: 1, programDate: program_date_04, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        def timeslot_05 = new TimeSlot(startTime: time_01, endTime: time_02, startTimeDisplay: timeDisplay_01, endTimeDisplay: timeDisplay_02, maxAppointments: 1, programDate: program_date_05, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        def timeslot_06 = new TimeSlot(startTime: time_02, endTime: time_03, startTimeDisplay: timeDisplay_02, endTimeDisplay: timeDisplay_03, maxAppointments: 1, programDate: program_date_05, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()

        new Appointment(timeSlot: timeslot_01, firstName: 'Tommorrow', lastName: 'Test', emailAddress: 'mistest@mmm.com', pin: '012345', archived: false, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        new Appointment(timeSlot: timeslot_02, firstName: 'Day After', lastName: 'Test', emailAddress: 'mistest@mmm.com', pin: '012345', archived: false, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        new Appointment(timeSlot: timeslot_03, firstName: 'Yesterday', lastName: 'Test', emailAddress: 'mistest@mmm.com', pin: '012345', archived: false, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        new Appointment(timeSlot: timeslot_04, firstName: 'Day Before', lastName: 'Test', emailAddress: 'mistest@mmm.com', pin: '012345', archived: false, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        new Appointment(timeSlot: timeslot_05, firstName: 'Today', lastName: 'Test 1', emailAddress: 'mistest@mmm.com', pin: '012345', archived: false, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        new Appointment(timeSlot: timeslot_06, firstName: 'Today', lastName: 'Test 2', emailAddress: 'mistest@mmm.com', pin: '012345', archived: false, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()

        return [message: 'OK']
    }

    @Transactional
    def cleanupProgramAppointments() {
        deleteLocation('E2E-PAS')
        return [message: 'OK']
    }

    @Transactional
    def prepareSignUpEmailOptional() {
        deleteLocation('E2E-SU-EO')

        def location = new Location(
                name: 'E2E - Sign Up - Email Optional',
                code: 'E2E-SU-Eo',
                timeZone: TimeZone.getTimeZone('America/Chicago'),
                active: true,
                showInSignUpList: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()

        def programEmailRequired = new Program(name: 'E2E - Program - Email Required',
                location: location,
                venue: 'E2E Test',
                active: true,
                emailRequired: true,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()

        def programEmailOptional = new Program(name: 'E2E - Program - Email Optional',
                location: location,
                venue: 'E2E Test',
                active: true,
                emailRequired: false,
                createdBy: TEST_ADMIN,
                lastUpdatedBy: TEST_ADMIN)
                .save()

        Date today = new Date()
        use(groovy.time.TimeCategory) {
            today = today - 6.hour
        }
        Date tomorrow = today + 1

        def program_date_email_required = new ProgramDate(date: tomorrow, program: programEmailRequired, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        def program_date_email_optional = new ProgramDate(date: tomorrow, program: programEmailOptional, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()

        def time_01 = Time.valueOf('08:00:00')
        def time_02 = Time.valueOf('08:15:00')

        def timeDisplay_01 = '08:00 AM'
        def timeDisplay_02 = '08:15 AM'

        def timeslot_required = new TimeSlot(startTime: time_01, endTime: time_02, startTimeDisplay: timeDisplay_01, endTimeDisplay: timeDisplay_02, maxAppointments: 1, programDate: program_date_email_required, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()
        def timeslot_optional = new TimeSlot(startTime: time_01, endTime: time_02, startTimeDisplay: timeDisplay_01, endTimeDisplay: timeDisplay_02, maxAppointments: 1, programDate: program_date_email_optional, active: true, createdBy: TEST_ADMIN, lastUpdatedBy: TEST_ADMIN).save()

        return [message: 'OK']
    }

    @Transactional
    def cleanupSignUpEmailOptional() {
        deleteLocation('E2E-SU-EO')
        return [message: 'OK']
    }

    private static deleteLocation(String code) {
        Location location = Location.findByCode(code)
        if (location) {
            for (program in Program.findAllByLocation(location)) {
                for (programDate in ProgramDate.findAllByProgram(program)) {
                    for (timeSlot in TimeSlot.findAllByProgramDate(programDate)) {
                        for (appointment in Appointment.findAllByTimeSlot(timeSlot)) {
                            appointment.delete()
                        }
                        for (pendingAppointment in PendingAppointment.findAllByTimeSlot(timeSlot)) {
                            pendingAppointment.delete()
                        }
                        timeSlot.delete()
                    }
                    programDate.delete()
                }
                program.delete()
            }
            for (programOwner in ProgramOwner.findAllByLocation(location)) {
                programOwner.delete()
            }
            for (announcement in Announcement.findAllByLocation(location)) {
                announcement.delete()
            }
            for (template in EmailTemplate.findAllByLocation(location)) {
                template.delete()
            }
            for (contact in ContactUs.findAllByLocation(location)) {
                contact.delete()
            }
            for (email in BccEmail.findAllByLocation(location)) {
                email.delete()
            }
            location?.delete(flush: true)
        }
    }

}
