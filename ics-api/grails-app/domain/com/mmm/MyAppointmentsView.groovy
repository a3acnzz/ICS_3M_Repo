package com.mmm

import groovy.json.JsonBuilder

import java.sql.Date
import java.sql.Time
import java.text.SimpleDateFormat

class MyAppointmentsView {

    Long id
    String firstName
    String lastName
    String emailAddress
    String pin
    String startTimeDisplay
    String endTimeDisplay
    Date programDate
    String programName
    String createdBy
    String createdByFirstName
    String createdByLastName
    Long programId
    Long programDateId
    Long timeSlotId
    Long locationId
    Time startTime
    Time endTime
    String venue
    Boolean archived

    static constraints = {
        firstName maxSize: 30
        lastName maxSize: 30
        emailAddress maxSize: 50
        pin maxSize: 15, nullable: true
        startTimeDisplay maxSize: 8
        endTimeDisplay maxSize: 8
        programName maxSize: 100
        createdBy maxSize: 15
        createdByFirstName maxSize: 30, nullable: true
        createdByLastName maxSize: 30, nullable: true
        venue maxSize: 50
    }

    /*The database view joins with the ics_user table.
    The name field will be null if the creator was a signup user.*/
    def setCreatedByUser() {
        if (this?.createdByFirstName == null) {
            def createdByUser = SignUpUser.findByUserPin(createdBy)
            this?.createdByFirstName = createdByUser.firstName
            this?.createdByLastName = createdByUser.lastName
        }
    }

    def toJson() {
        setCreatedByUser()
        def json = new JsonBuilder()

        def jsonData = json {
            id this?.id
            firstName this?.firstName
            lastName this?.lastName
            emailAddress this?.emailAddress
            pin this?.pin
            startTimeDisplay this?.startTimeDisplay
            endTimeDisplay this?.endTimeDisplay
            programDate this?.programDate
            programDateDisplay getFormattedDateString(this?.programDate)
            programName this?.programName
            createdByFirstName this?.createdByFirstName
            createdByLastName this?.createdByLastName
            programId this?.programId
            programDateId this?.programDateId
            timeSlotId this?.timeSlotId
            locationId this?.locationId
            startTime this?.startTime.toString()
            endTime this?.endTime.toString()
            venue this?.venue
        }
        return jsonData
    }

    def getFormattedDateString(date) {
        SimpleDateFormat sdfDisplay = new SimpleDateFormat('MM/dd/yyyy'); //yyyy-MM-dd
        String formattedProgramDateDisplay = sdfDisplay.format(date);
        return formattedProgramDateDisplay;
    }
}
