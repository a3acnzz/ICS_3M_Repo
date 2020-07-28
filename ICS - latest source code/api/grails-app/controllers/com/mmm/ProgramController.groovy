package com.mmm

import grails.plugin.springsecurity.annotation.Secured

class ProgramController {

    ProgramService programService

    static responseFormats = ['json']

    @Secured(['ROLE_USER'])
    def search (String name, Long locationId, Boolean active) {
        respond programService.search(name, locationId, active)
    }

    @Secured(['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def save() {
        respond programService.save(request.JSON)
    }
}