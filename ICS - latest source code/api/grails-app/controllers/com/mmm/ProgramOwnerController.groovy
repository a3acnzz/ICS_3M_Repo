package com.mmm

import grails.plugin.springsecurity.annotation.Secured

class ProgramOwnerController {

    ProgramOwnerService programOwnerService

	static responseFormats = ['json']

    @Secured(['ROLE_ADMIN'])
    def search (Long locationId, Long userId) {
        respond programOwnerService.search(locationId, userId)
    }

    @Secured(['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def locationPrograms (Long locationId) {
        respond programOwnerService.getLocationPrograms(locationId)
    }

    @Secured(['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def getProgram (Long locationId, Long programId) {
        respond programOwnerService.getProgram(locationId, programId)
    }

    @Secured(['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def getProgramAppointments (Long locationId, Long programId) {
        respond programOwnerService.getProgramAppointments(locationId, programId)
    }
}
