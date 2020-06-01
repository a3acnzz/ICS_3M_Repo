package com.mmm

import grails.plugin.springsecurity.annotation.Secured

class BccEmailController {

    BccEmailService bccEmailService

    static responseFormats = ['json']

    @Secured(['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def search (Long locationId, Long programId) {
        respond bccEmailService.search(locationId, programId)
    }

    @Secured(['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def save() {
        respond bccEmailService.save(request.JSON)
    }
}
