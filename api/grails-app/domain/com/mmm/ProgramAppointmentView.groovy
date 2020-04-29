package com.mmm

class ProgramAppointmentView {

    Long programId
    Date programDate
    Long appointmentId
    String firstName
    String lastName
    String emailAddress
    boolean archived
	Long minAppointmentsPerUser
	Long maxAppointmentsPerUser

    static mapping = {
        id name: 'appointmentId'
    }

    static constraints = {
        firstName maxSize: 30
        lastName maxSize: 30
        emailAddress maxSize: 50
    }
}
