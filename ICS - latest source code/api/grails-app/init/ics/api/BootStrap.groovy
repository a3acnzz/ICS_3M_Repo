package ics.api

class BootStrap {

    def init = { servletContext ->
        // Resolves issue ICS-129.
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"))
    }

//    def admin_role = new Role(code: 'ROLE_ADMIN').save()
//    def program_owner_role = new Role(code: 'ROLE_PROGRAM_OWNER').save()
//
//    def test_user = new IcsUser(firstName: 'James', lastName: 'Krippendorf', email: 'jkrippendorf@mmm.com', userPin: 'TEST_USER')
//            .addToRoles(admin_role)
//            .addToRoles(program_owner_role)
//            .save()
//
//    def test_user_2 = new IcsUser(firstName: 'Amy', lastName: 'Test1', email: 'jkrippendorf@mmm.com', userPin: 'TEST_USER_AMY')
//            .addToRoles(admin_role)
//            .addToRoles(program_owner_role)
//            .save()
//
//    def central_time = TimeZone.getTimeZone('America/Chicago')
//    def pacific_time = TimeZone.getTimeZone('America/Los_Angeles')
//
//    def maplewood = new Location(name: 'Maplewood', code: 'MW', timeZone: central_time, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def costa_mesa = new Location(name: 'Costa Mesa', code: 'CM', timeZone: pacific_time, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//
//    def costa_mesa_program_owner = new ProgramOwner(location: costa_mesa, icsUser: test_user_2, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//
//    def mw_flu_shot = new Program(name: '2017 Flu Shot Program - Maplewood', location: maplewood, venue: '220 6th Floor', active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def cm_flu_shot = new Program(name: '2017 Flu Shot Program - Costa Mesa', location: costa_mesa, venue: 'California', active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def cm_rabies_shot = new Program(name: '2017 Rabies Shot Program - Costa Mesa', location: costa_mesa, venue: 'Disneyland', active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//
//    def date_01 = Date.parse('yyyy-MM-dd', '2017-10-10')
//    def date_02 = Date.parse('yyyy-MM-dd', '2017-10-11')
//
//    def mw_flu_shot_date_01 = new ProgramDate(date: date_01, program: mw_flu_shot, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def mw_flu_shot_date_02 = new ProgramDate(date: date_02, program: mw_flu_shot, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def cm_flu_shot_date_01 = new ProgramDate(date: date_01, program: cm_flu_shot, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def cm_flu_shot_date_02 = new ProgramDate(date: date_02, program: cm_flu_shot, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//
//    def time_01 = Time.valueOf('08:00:00')
//    def time_02 = Time.valueOf('08:15:00')
//    def time_03 = Time.valueOf('08:30:00')
//
//    def timeDisplay_01 = '08:00 AM'
//    def timeDisplay_02 = '08:15 AM'
//    def timeDisplay_03 = '08:30 AM'
//
//    def mw_flu_shot_date_01_timeslot_01 = new TimeSlot(startTime: time_01, endTime: time_02, startTimeDisplay: timeDisplay_01, endTimeDisplay: timeDisplay_02,maxAppointments: 5, programDate: mw_flu_shot_date_01, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def mw_flu_shot_date_01_timeslot_02 = new TimeSlot(startTime: time_02, endTime: time_03, startTimeDisplay: timeDisplay_02, endTimeDisplay: timeDisplay_03,maxAppointments: 5, programDate: mw_flu_shot_date_01, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def mw_flu_shot_date_02_timeslot_01 = new TimeSlot(startTime: time_01, endTime: time_02, startTimeDisplay: timeDisplay_01, endTimeDisplay: timeDisplay_02,maxAppointments: 5, programDate: mw_flu_shot_date_02, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def mw_flu_shot_date_02_timeslot_02 = new TimeSlot(startTime: time_02, endTime: time_03, startTimeDisplay: timeDisplay_02, endTimeDisplay: timeDisplay_03,maxAppointments: 5, programDate: mw_flu_shot_date_02, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def cm_flu_shot_date_01_timeslot_01 = new TimeSlot(startTime: time_01, endTime: time_02, startTimeDisplay: timeDisplay_01, endTimeDisplay: timeDisplay_02,maxAppointments: 5, programDate: cm_flu_shot_date_01, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def cm_flu_shot_date_01_timeslot_02 = new TimeSlot(startTime: time_02, endTime: time_03, startTimeDisplay: timeDisplay_02, endTimeDisplay: timeDisplay_03,maxAppointments: 5, programDate: cm_flu_shot_date_01, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def cm_flu_shot_date_02_timeslot_01 = new TimeSlot(startTime: time_01, endTime: time_02, startTimeDisplay: timeDisplay_01, endTimeDisplay: timeDisplay_02,maxAppointments: 5, programDate: cm_flu_shot_date_02, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def cm_flu_shot_date_02_timeslot_02 = new TimeSlot(startTime: time_02, endTime: time_03, startTimeDisplay: timeDisplay_02, endTimeDisplay: timeDisplay_03,maxAppointments: 5, programDate: cm_flu_shot_date_02, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//
//    def mw_appointment_01 = new Appointment(firstName: 'FirstName01', lastName: 'LastName01', emailAddress: 'jkrippendorf@mmm.com', pin:'a4z9hzz', timeSlot: mw_flu_shot_date_01_timeslot_01, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def mw_appointment_02 = new Appointment(firstName: 'FirstName02', lastName: 'LastName02', emailAddress: 'jkrippendorf@mmm.com', pin:'a4z9hzz', timeSlot: mw_flu_shot_date_01_timeslot_02, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def cm_appointment_01 = new Appointment(firstName: 'FirstName03', lastName: 'LastName03', emailAddress: 'jkrippendorf@mmm.com', pin:'a4z9hzz', timeSlot: cm_flu_shot_date_01_timeslot_01, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def cm_appointment_02 = new Appointment(firstName: 'FirstName04', lastName: 'LastName04', emailAddress: 'jkrippendorf@mmm.com', pin:'a4z9hzz', timeSlot: cm_flu_shot_date_01_timeslot_02, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//
//    def generic_confirmation_email_template = new EmailTemplate(templateType: 'Confirmation', subject: 'ICS - Confirmation', message: 'Your appointment has been created.', program: null, location: null, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def generic_cancellation_email_template = new EmailTemplate(templateType: 'Cancellation', subject: 'ICS - Cancellation', message: 'Your appointment has been cancelled.', program: null, location: null, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//
//    def mw_confirmation_email_template = new EmailTemplate(templateType: 'Confirmation', subject: 'ICS - Maplewood - Confirmation', message: 'Your Maplewood appointment has been created.', program: null, location: maplewood, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def mw_cancellation_email_template = new EmailTemplate(templateType: 'Cancellation', subject: 'ICS - Maplewood - Cancellation', message: 'Your Maplewood appointment has been cancelled.', program: null, location: maplewood, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//
//    def cm_flu_shot_confirmation_email_template = new EmailTemplate(templateType: 'Confirmation', subject: 'ICS - Costa Mesa - Flu Shot - Confirmation', message: 'Your Costa Mesa Flu Shot appointment has been created.', program: cm_flu_shot, location: costa_mesa, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def cm_flu_shot_cancellation_email_template = new EmailTemplate(templateType: 'Cancellation', subject: 'ICS - Costa Mesa - Flu Shot - Cancellation', message: 'Your Costa Mesa Flu Shot appointment has been cancelled.', program: cm_flu_shot, location: costa_mesa, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//
//    def system_announcement = new Announcement(message: 'System announcement', location: null, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()
//    def maplewood_announcement = new Announcement(message: 'Maplewood announcement', location: maplewood, active: true, createdBy: test_user.userPin, lastUpdatedBy: test_user.userPin).save()

    def destroy = {
    }
}