package com.mmm

import groovy.json.JsonBuilder

class Announcement {

    Location location
    String message
    Boolean active
    Date dateCreated
    Date lastUpdated
    String createdBy
    String lastUpdatedBy

    static constraints = {
        location nullable: true, unique: true
        message maxSize: 500
        createdBy maxSize: 15
        lastUpdatedBy maxSize: 15
    }

    def copy(Announcement that) {
        message = that.message ?: ''
        location = that.location
        active = that.active
    }

    def toJson() {
        def json = new JsonBuilder()
        def jsonData = json {
            id this?.id
            message this?.message
            location this?.location
            active this?.active
        }
        return jsonData
    }
}
