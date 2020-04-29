package com.mmm

import com.mmm.AppConstant
import groovy.json.JsonBuilder

class EmailTemplate {

    Location location
    Program program
    String templateType
    String subject
    String message
    Boolean active
    Date dateCreated
    Date lastUpdated
    String createdBy
    String lastUpdatedBy

    static constraints = {
        location nullable: true
        program nullable: true
        templateType maxSize: 20, inList: [AppConstant.EMAIL_TYPE_CONFIRM, AppConstant.EMAIL_TYPE_CANCEL], unique:['location', 'program']
        subject maxSize: 150, nullable: true
        message maxSize: 2000, nullable: true
        createdBy maxSize: 15
        lastUpdatedBy maxSize: 15
    }

    def copy(EmailTemplate that) {
        templateType = that.templateType
        subject = that.subject
        message = that.message
        program = that.program
        location = that.location
        active = that.active
    }

    def toJson() {
        def json = new JsonBuilder()
        def jsonData = json {
            id this?.id
            templateType this?.templateType
            subject this?.subject
            message this?.message
            active this?.active
            templateLevel this?.getTemplateLevel()
        }
        return jsonData
    }

    def getTemplateLevel() {
        if (!this?.locationId && !this?.programId) {
            return 'System'
        }
        else if (this?.locationId && !this?.programId) {
            return 'Location'
        }
        else if (this?.locationId && this?.programId) {
            return 'Program'
        }
        else {
            return 'Undefined Email Template Level'
        }
    }

}
