package com.mmm

import grails.plugin.springsecurity.annotation.Secured

class AnnouncementController {

    AnnouncementService announcementService

    static responseFormats = ['json']

    @Secured(['ROLE_USER', 'ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def search(Long locationId, Boolean active) {
        respond announcementService.search(locationId, active)
    }

    @Secured(['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def save() {
        respond announcementService.save(request.JSON)
    }
}
