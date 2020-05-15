package com.mmm

import groovy.json.JsonBuilder

class ContactUs {

    Location location
    String message
    Date dateCreated
    Date lastUpdated
    String createdBy
    String lastUpdatedBy

    static constraints = {
        location nullable: true, unique: true
        message maxSize: 300
        createdBy maxSize: 15
        lastUpdatedBy maxSize: 15
    }

    def toJson() {
        def json = new JsonBuilder()
        def jsonData = json {
            message this?.message
            location this?.location
        }
        return jsonData
    }

    def copy(ContactUs that) {
        message = that.message
        location = that.location
    }
}
