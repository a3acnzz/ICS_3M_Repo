package com.mmm

import grails.plugin.springsecurity.annotation.Secured

class AppointmentController {

    AppointmentService appointmentService

    static responseFormats = ['json']

    @Secured(['ROLE_USER'])
    def search(String firstName, String lastName, String emailAddress, String pin, Long timeSlotId) {
        respond appointmentService.search(firstName, lastName, emailAddress, pin, timeSlotId)
    }

    @Secured(['ROLE_USER'])
    def getUserAppointments() {
        respond appointmentService.getUserAppointments()
    }

    @Secured(['ROLE_ADMIN', 'ROLE_PROGRAM_OWNER'])
    def getPendingAppointments(Long programId) {
        respond appointmentService.getPendingAppointments(programId)
    }

    @Secured(['ROLE_ADMIN', 'ROLE_PROGRAM_OWNER'])
    def clearPendingAppointment() {
        respond appointmentService.clearPendingAppointment(request.JSON)
    }

    @Secured(['ROLE_USER'])
    def managePendingAppointment() {
        respond appointmentService.managePendingAppointment(request.JSON)
    }
	
    @Secured(['ROLE_USER'])
    def save() {
        respond appointmentService.save(request.JSON)
    }

    @Secured(['ROLE_USER'])
    def cancel() {
        respond appointmentService.cancel(request.JSON)
    }

    @Secured(['ROLE_USER'])
    def reschedule() {
        respond appointmentService.reschedule(request.JSON)
    }

    @Secured(['ROLE_USER'])
    def getAppointment(Long id) {
        respond appointmentService.getAppointment(id)
    }

       @Secured(['ROLE_USER'])
    def validateAppointments() {
        respond appointmentService.validateAppointments(request.JSON)
    }

    @Secured(['ROLE_USER'])
    def validateTimeSlots() {
        respond appointmentService.validateTimeSlots(request.JSON)
    }


}
