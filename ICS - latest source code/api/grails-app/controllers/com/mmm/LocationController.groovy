package com.mmm

import grails.plugin.springsecurity.annotation.Secured

class LocationController {

    LocationService locationService

    static responseFormats = ['json']

    @Secured(['ROLE_USER', 'ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def getLocation(Long id) {
        Location location
        if (id) {
            location = locationService.getLocation(id)
        }
        if (!location) {
            location = new Location()
            location.active = true
            location.showInSignUpList = true
        }
        respond location
    }

    @Secured(['ROLE_USER', 'ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def getLocationByCode(String code) {
        respond locationService.getLocationByCode(code)
    }

    @Secured(['ROLE_USER'])
    def getSignUpLocations() {
        respond locationService.getSignUpLocations()
    }

    @Secured(['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN'])
    def getProgramOwnerLocations() {
        respond locationService.getProgramOwnerLocations()
    }

    @Secured(['ROLE_ADMIN'])
    def getAdminLocations() {
        respond locationService.getAdminLocations()
    }

    @Secured(['ROLE_ADMIN'])
    def getTimeZones() {
        respond locationService.getTimeZones()
    }

    @Secured(['ROLE_ADMIN'])
    def save() {
        respond locationService.save(request.JSON)
    }
}