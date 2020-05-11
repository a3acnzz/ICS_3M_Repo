package com.mmm

import java.sql.Time

class AppointmentDetailsView {

    Long locationId
    String timeZone
    Long programId
    String programName
    String venue
    Date programDate
    Time startTime
    String startTimeDisplay
    Time endTime
    String endTimeDisplay
    Long appointmentId
    String firstName
    String lastName
    String emailAddress
    String pin

    static mapping = {
        id name: 'appointmentId'
    }

    static constraints = {
        timeZone maxSize: 50
        programName maxSize: 100
        venue maxSize: 50
        startTimeDisplay maxSize: 8
        endTimeDisplay maxSize: 8
        firstName maxSize: 30
        lastName maxSize: 30
        emailAddress maxSize: 50
        pin maxSize: 15, nullable: true
    }
}
