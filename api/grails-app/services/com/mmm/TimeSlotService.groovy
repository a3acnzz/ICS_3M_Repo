package com.mmm

import com.mmm.auth.CustomUserDetail
import grails.plugin.springsecurity.SpringSecurityService
import grails.transaction.Transactional

@Transactional
class TimeSlotService {

    SpringSecurityService springSecurityService
    IcsMailService icsMailService

    @Transactional(readOnly = true)
    def getTimeSlots(Long programDateId) {
        return ProgramDateTimeSlotView.findAllByProgramDateId(programDateId, [sort: 'startTime'])
    }

    @Transactional(readOnly = true)
    def getTimeSlot(Long id) {
        TimeSlot timeSlot
        if (id) {
            timeSlot = TimeSlot.get(id)
        }
        if (!timeSlot) {
            timeSlot = new TimeSlot()
        }
        return timeSlot
    }

    @Transactional(readOnly = true)
    def getAppointmentCounts(Long id) {
        TimeSlot timeSlot = TimeSlot.get(id);
        int maxAppointments = 0
        int currentAppointments = 0
        int pendingAppointments = 0
        int availableAppointments = 0

        if (timeSlot) {
            maxAppointments = timeSlot.maxAppointments
            currentAppointments = Appointment.countByTimeSlot(timeSlot)
            pendingAppointments = PendingAppointment.countByTimeSlot(timeSlot)
            availableAppointments = maxAppointments - currentAppointments - pendingAppointments
        }

        return [
                'maxAppointments'      : maxAppointments,
                'currentAppointments'  : currentAppointments,
                'pendingAppointments'  : pendingAppointments,
                'availableAppointments': availableAppointments
        ]
    }

    @Transactional
    protected saveTimeSlots(timeSlots, ProgramDate programDate) {
        CustomUserDetail user = springSecurityService?.principal

        if (!programDate || !timeSlots) {
            return null
        }

        TimeSlot timeSlot
        TimeSlot submittedTimeSlot
        for (slot in timeSlots) {
            submittedTimeSlot = new TimeSlot(slot)
            submittedTimeSlot.programDate = programDate

            if (slot.id) {
                timeSlot = TimeSlot.get(slot.id)
            } else {
                timeSlot = new TimeSlot()
                timeSlot.createdBy = user?.username
            }

            if (timeSlot) {
                timeSlot.lastUpdatedBy = user?.username
                timeSlot.copy(submittedTimeSlot)
                timeSlot.save()
            }
        }
    }

    @Transactional
    def cancel(def json) {
        if (!json) {
            return null
        }

        def timeSlotId = json.timeSlotId

        if (timeSlotId) {
            TimeSlot timeSlot = TimeSlot.get(timeSlotId)
            if (timeSlot) {
                decreaseMaxAppointments(timeSlot, timeSlot.maxAppointments)
                timeSlot.delete()
            }
        }
        return []
    }

    @Transactional
    def increaseMaxAppointments(def json) {
        CustomUserDetail user = springSecurityService?.principal

        if (!json) {
            return null
        }

        def timeSlotId = json.timeSlotId
        def maxAppointmentsChange = json.maxAppointmentsChange

        if (timeSlotId) {
            TimeSlot timeSlot = TimeSlot.get(timeSlotId)
            if (timeSlot) {
                timeSlot.maxAppointments += maxAppointmentsChange
                timeSlot.lastUpdatedBy = user?.username
                timeSlot.save()
                return timeSlot
            }
        }
        return null
    }

    @Transactional
    def decreaseMaxAppointments(def json) {
        CustomUserDetail user = springSecurityService?.principal

        if (!json) {
            return null
        }

        def timeSlotId = json.timeSlotId
        def maxAppointmentsChange = json.maxAppointmentsChange

        if (timeSlotId) {
            TimeSlot timeSlot = TimeSlot.get(timeSlotId)
            if (timeSlot) {
                decreaseMaxAppointments(timeSlot, maxAppointmentsChange)
                return timeSlot
            }
        }
        return null
    }

    /*
    Overloading the decreaseMaxAppointments method here
    This way we can call it from timeSlotService or programDateService
    The logic is more complex when decreasing an appointment time slot
    */

    @Transactional
    protected decreaseMaxAppointments(TimeSlot timeSlot, change) {
        int maxAppointments = timeSlot.maxAppointments
        int currentAppointments = Appointment.countByTimeSlot(timeSlot)
        int pendingAppointments = PendingAppointment.countByTimeSlot(timeSlot)
        int availableAppointments = maxAppointments - currentAppointments - pendingAppointments

        // If decrease is less than or equal to available appointments, just decrease. Easy!
        if (availableAppointments >= change) {
            timeSlot.maxAppointments -= change
            timeSlot.save()
            // else if decrease is less than or equal to available appointments and pending appointments, just decrease. Pending appointments should get an error message when they try to submit.
        } else if ((availableAppointments + pendingAppointments) >= change) {
            /* If decrease is less than available +pending, decrease the count from available appointments(balanceCount=change - available appointments)
             and delete the remaining count from pending appointments (number of pending appointments to be deleted = balanceCount).*/
            def balance = change - availableAppointments
            List<PendingAppointment> pAppointments = PendingAppointment.findAllByTimeSlot(timeSlot, [max: balance, sort: "dateCreated", order: "desc"])
            pAppointments?.each { pAppointment ->
                pAppointment.delete()
            }
            timeSlot.maxAppointments -= change
            timeSlot.save()
            // else if decrease is greater than available and pending appointments, cancel existing appointments in last in-first out order and send an email
        } else {

            //Delete pending appointments if any
            if (pendingAppointments > 0) {

                List<PendingAppointment> pendAppointments = PendingAppointment.findAllByTimeSlot(timeSlot, [max: pendingAppointments, sort: "dateCreated", order: "desc"])
                pendAppointments?.each { pendAppointment ->
                    pendAppointment.delete()
                }
            }
            def balance = change - (availableAppointments + pendingAppointments)
            // Delete remaining appointments from booked appointments
            if (balance > 0) {
                // Get appointments to be cancelled
                List<Appointment> appointments = Appointment.findAllByTimeSlot(timeSlot, [max: balance, sort: "dateCreated", order: "desc"])
                // Send cancellation email and delete appointment
                appointments?.each { appointment ->
                    icsMailService.sendEmail(appointment.id, AppConstant.EMAIL_TYPE_CANCEL)
                    appointment.delete()
                }
            }

            // Decrement time slot max appointments
            timeSlot.maxAppointments -= change
            timeSlot.save()
        }
    }

    @Transactional
    def isTimeSlotFull(Long id) {
        if (!id) {
            return true
        }
        TimeSlot timeSlot = TimeSlot.get(id)
        return [
                timeSlotFull: timeSlot.maxAppointments <= Appointment.countByTimeSlot(timeSlot) + PendingAppointment.countByTimeSlot(timeSlot)
        ]
    }
}
