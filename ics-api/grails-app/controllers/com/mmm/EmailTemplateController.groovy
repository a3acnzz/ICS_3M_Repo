package com.mmm

import grails.plugin.springsecurity.annotation.Secured

class EmailTemplateController {

    EmailTemplateService emailTemplateService

    static responseFormats = ['json']

    @Secured(['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def search (Long locationId, Long programId) {
        respond emailTemplateService.search(locationId, programId)
    }

    @Secured(['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def save() {
        respond emailTemplateService.save(request.JSON)
    }
}
