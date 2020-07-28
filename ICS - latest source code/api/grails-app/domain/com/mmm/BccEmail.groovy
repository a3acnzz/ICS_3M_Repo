package com.mmm

import groovy.json.JsonBuilder

class BccEmail {

    Location location
    Program program
    String email
    Date dateCreated
    Date lastUpdated
    String createdBy
    String lastUpdatedBy

    static constraints = {
        location nullable: true
        program nullable: true
        email maxSize: 50, unique:['location', 'program']
        createdBy maxSize: 15
        lastUpdatedBy maxSize: 15
    }

    def copy(BccEmail that) {
        email = that.email
        program = that.program
        location = that.location
    }

    def toJson() {
        def json = new JsonBuilder()
        def jsonData = json {
            id this?.id
            email this?.email
            program this?.program?.id
            location this?.location?.id
        }
        return jsonData
    }
}
