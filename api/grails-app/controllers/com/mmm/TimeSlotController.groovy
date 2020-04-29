package com.mmm

import grails.plugin.springsecurity.annotation.Secured

class TimeSlotController {

    TimeSlotService timeSlotService

    static responseFormats = ['json']

    @Secured(['ROLE_USER'])
    def getTimeSlots(Long programDateId) {
        respond timeSlotService.getTimeSlots(programDateId)
    }

    @Secured(['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def cancel() {
        respond timeSlotService.cancel(request.JSON)
    }

    @Secured(['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def increaseMaxAppointments() {
        respond timeSlotService.increaseMaxAppointments(request.JSON)
    }

    @Secured(['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def decreaseMaxAppointments() {
        respond timeSlotService.decreaseMaxAppointments(request.JSON)
    }

    @Secured(['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def getAppointmentCounts(Long timeSlotId) {
        respond timeSlotService.getAppointmentCounts(timeSlotId)
    }

    @Secured(['ROLE_USER'])
    def isTimeSlotFull(Long timeSlotId) {
        respond timeSlotService.isTimeSlotFull(timeSlotId)
    }
}
