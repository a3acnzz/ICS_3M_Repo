package com.mmm

import com.mmm.auth.CustomUserDetail
import com.mmm.auth.UnauthorizedException
import grails.plugin.springsecurity.SpringSecurityService
import grails.transaction.Transactional

@Transactional
class EmailTemplateService {

    SpringSecurityService springSecurityService
    ProgramOwnerService programOwnerService

    @Transactional(readOnly = true)
    def search(Long locationId, Long programId) {

        Location location = Location.load(locationId)
        Program program = Program.load(programId)

        List<EmailTemplate> systemEmailTemplates = EmailTemplate.findAllByLocationIsNullAndProgramIsNull()
        List<EmailTemplate> locationEmailTemplates = EmailTemplate.findAllByLocationAndProgramIsNull(location)
        List<EmailTemplate> programEmailTemplates = EmailTemplate.findAllByLocationAndProgram(location, program)

        List<EmailTemplate> displayTemplates
        List<EmailTemplate> editableTemplates

        // If locationId and programId are null, system templates
        if (!locationId && !programId) {
            editableTemplates = systemEmailTemplates
        }

        // If locationId and programId are null, system templates
        if (locationId && !programId) {
            displayTemplates = systemEmailTemplates
            editableTemplates = locationEmailTemplates
        }

        // If locationId and programId are not null, program templates
        if (locationId && programId) {
            displayTemplates = systemEmailTemplates
            displayTemplates += locationEmailTemplates

            editableTemplates = programEmailTemplates
        }

        return [
                displayTemplates : displayTemplates.collect {it.toJson()},
                editableTemplates: editableTemplates.collect {it.toJson()}
        ]
    }

    @Transactional
    def save(def jsonData) {
        if (!jsonData) {
            return null
        }
        CustomUserDetail user = springSecurityService?.principal

        EmailTemplate submittedEmailTemplate
        EmailTemplate emailTemplate

        for (template in jsonData?.templates) {
            // Check that the program owner is authorized for the submitted location
            if (jsonData.locationId) {
                //program owner validation for location should not be done for the generic email templates because location object will be null
                if (!programOwnerService.programOwnerAuthorized(jsonData.locationId)) {
                    throw new UnauthorizedException()
                }
            }

            submittedEmailTemplate = new EmailTemplate(template)

            // Delete cleared email template
            if (!submittedEmailTemplate.subject && !submittedEmailTemplate.message && template.id) {
                EmailTemplate clearedTemplate = EmailTemplate.load(template.id)
                clearedTemplate.delete()
            }
            // Ignore blank email templates
            else if (!submittedEmailTemplate.subject && !submittedEmailTemplate.message) {
                // Do nothing
            }
            // Save email templates
            else {
                emailTemplate = new EmailTemplate()
                if (jsonData.locationId) {
                    submittedEmailTemplate.location = Location.load(jsonData.locationId)
                }
                if (jsonData.programId) {
                    submittedEmailTemplate.program = Program.load(jsonData.programId)
                }
                if (template.id) {
                    emailTemplate = EmailTemplate.get(template.id)
                } else {
                    emailTemplate.createdBy = user?.username
                }
                if (emailTemplate) {
                    emailTemplate.lastUpdatedBy = user?.username
                    emailTemplate.copy(submittedEmailTemplate)
                    emailTemplate.active = true
                    emailTemplate.save()
                }
            }
        }
        return ['message' : 'Changes saved']
    }
}
