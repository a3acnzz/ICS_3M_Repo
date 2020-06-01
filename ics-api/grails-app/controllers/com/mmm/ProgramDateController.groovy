package com.mmm

import grails.plugin.springsecurity.annotation.Secured

class ProgramDateController {

    ProgramDateService programDateService

    static responseFormats = ['json']

    @Secured(['ROLE_USER'])
    def getProgramDates (Long programId) {
        respond programDateService.getProgramDates(programId)
    }

    @Secured(['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def cancel() {
        respond programDateService.cancel(request.JSON)
    }

    @Secured(['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def increaseMaxAppointments() {
        respond programDateService.increaseMaxAppointments(request.JSON)
    }

    @Secured(['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def decreaseMaxAppointments() {
        respond programDateService.decreaseMaxAppointments(request.JSON)
    }
}
