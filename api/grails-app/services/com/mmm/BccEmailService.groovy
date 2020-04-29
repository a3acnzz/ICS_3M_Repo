package com.mmm

import com.mmm.auth.CustomUserDetail
import com.mmm.auth.UnauthorizedException
import grails.plugin.springsecurity.SpringSecurityService
import grails.transaction.Transactional

@Transactional
class BccEmailService {

    SpringSecurityService springSecurityService
    ProgramOwnerService programOwnerService

    @Transactional(readOnly = true)
    def search(Long locationId, Long programId) {

        // Check that the program owner is authorized for the submitted location
        if (!programOwnerService.programOwnerAuthorized(locationId)) {
            throw new UnauthorizedException()
        }

        def results = BccEmail.createCriteria().list() {
            if (locationId != null) {
                eq("location.id", locationId)
            } else {
                isNull("location.id")
            }
            if (programId != null) {
                eq("program.id", programId)
            } else {
                isNull("program.id")
            }
            order("email")
        }
        return results
    }

    @Transactional
    def save(def bccEmailJson) {

        if (!bccEmailJson) {
            return null
        }
        // Check that the program owner is authorized for the submitted location
        if (!programOwnerService.programOwnerAuthorized(bccEmailJson.locationId)) {
            throw new UnauthorizedException()
        }

        CustomUserDetail user = springSecurityService?.principal

        Location location = Location.get(bccEmailJson.locationId)
        Program program = Program.get(bccEmailJson.programId)
        def submittedEmailAddressList = [];

        BccEmail bccEmail
        // Save list of submitted email copy addresses
        for (record in bccEmailJson.bccEmailList) {
            bccEmail = BccEmail.findOrCreateWhere(location: location, program: program, email: record.email)
            bccEmail.createdBy = bccEmail.createdBy ?: user?.username // If 'createdBy' is not null, use existing value, else populate new record with current user
            bccEmail.lastUpdatedBy = user?.username
            bccEmail.save()
            submittedEmailAddressList.push(bccEmail)
        }

        // Create list of all email addresses for given level
        List<BccEmail> emailAddressList = BccEmail.findAllByLocationAndProgram(location, program)

        // Remove email addresses not in submitted list
        for (emailAddress in emailAddressList) {
            if (!submittedEmailAddressList.contains(emailAddress)) {
                emailAddress.delete()
            }
        }

        return search(location?.id, program?.id)
    }
}
