package com.mmm

import com.mmm.auth.CustomUserDetail
import com.mmm.auth.UnauthorizedException
import grails.plugin.springsecurity.SpringSecurityService
import grails.transaction.Transactional

@Transactional
class ContactUsService {

    SpringSecurityService springSecurityService
    ProgramOwnerService programOwnerService

    @Transactional(readOnly = true)
    def search(Long locationId) {
        def results = ContactUs.createCriteria().list() {

            if (locationId != null) {
                eq("location.id", locationId)
            } else {
                isNull("location.id")
            }
        }
        return results
    }

    @Transactional
    def save(def json) {

        if (!json) {
            return null
        }

        // Check that the program owner is authorized for the submitted location
        if (!programOwnerService.programOwnerAuthorized(json.locationId)) {
            throw new UnauthorizedException()
        }

        CustomUserDetail user = springSecurityService?.principal

        ContactUs submittedContactUs = new ContactUs(json)
        ContactUs contactUs

        if (json.locationId) {
            submittedContactUs.location = Location.load(json.locationId)
        }

        if (json.id) {
            contactUs = ContactUs.get(json.id)
        }
        if (!contactUs) {
            contactUs = new ContactUs()
            contactUs.createdBy = user?.username
        }
        contactUs.lastUpdatedBy = user?.username
        contactUs.copy(submittedContactUs)
        /*
        1. Create without message - Should not save in database (!json.id && !json.message)
        2. Create with message - Should save in database (!json.id && json.message)
        3. Update with message - Should save in database (json.id && json.message)
        4. Update without message - Should delete in database (json.id && !json.message)
         */
        //handle delete functionality
        if (json.id && !json.message)
            contactUs.delete()
        else if (!json.id && !json.message)
            return contactUs.toJson()
        else
            contactUs.save()

        return contactUs.toJson()
    }

}
