package com.mmm

import grails.plugin.springsecurity.annotation.Secured

class ContactUsController {
    ContactUsService contactUsService

    static responseFormats = ['json']

    @Secured(['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def save() {
        respond contactUsService.save(request.JSON)
    }

    @Secured(['ROLE_USER', 'ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def search(Long locationId) {
        request.getSession()
        respond contactUsService.search(locationId)
    }
}
