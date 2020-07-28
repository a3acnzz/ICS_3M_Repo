package com.mmm

class PendingAppointment {

    TimeSlot timeSlot
    Date dateCreated
    String createdBy

    static constraints = {
        createdBy maxSize: 15
    }

    def copy(PendingAppointment that) {
        timeSlot = that.timeSlot
    }
}
