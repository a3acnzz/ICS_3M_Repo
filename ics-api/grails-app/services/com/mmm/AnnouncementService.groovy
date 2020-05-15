package com.mmm

import com.mmm.auth.CustomUserDetail
import com.mmm.auth.UnauthorizedException
import grails.plugin.springsecurity.SpringSecurityService
import grails.transaction.Transactional

@Transactional
class AnnouncementService {

    SpringSecurityService springSecurityService
    ProgramOwnerService programOwnerService

    @Transactional(readOnly = true)
    def search(Long locationId, Boolean active) {
        def results = Announcement.createCriteria().list() {

            if (locationId != null) {
                eq("location.id", locationId)
            } else {
                isNull("location.id")
            }
            if (active != null) {
                eq("active", active)
            }
        }
        return results
    }

    @Transactional
    def save(def json) {
        // Check that the program owner is authorized for the submitted location
        if (!programOwnerService.programOwnerAuthorized(json.location.id)) {
            throw new UnauthorizedException()
        }

        CustomUserDetail user = springSecurityService?.principal

        Announcement submittedAnnouncement = new Announcement(json)
        Announcement announcement

        if (json.locationId) {
            submittedAnnouncement.location = Location.load(json.locationId)
        }

        if (json.id) {
            announcement = Announcement.get(json.id)
        }
        if (!announcement) {
            announcement = new Announcement()
            announcement.createdBy = user?.username
        }
        announcement.lastUpdatedBy = user?.username
        announcement.copy(submittedAnnouncement)
        announcement.save()

        return announcement.toJson()
    }
}
