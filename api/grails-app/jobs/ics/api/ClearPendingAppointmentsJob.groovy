package ics.api

import com.mmm.AppConstant
import com.mmm.PendingAppointment

/**
 *  This job clears pending appointments that have not been booked after a set interval of time.
 *  This job runs every ten minutes on the :10s
 */
class ClearPendingAppointmentsJob {

    static triggers = {
        // Run every ten minutes on the :10s (i.e. XX:10, XX:20, XX:30, XX:40, XX:50, XX:00)
        cron name: 'clearPendingAppointmentsTrigger', cronExpression: "0 */10 * ? * *"
        // cron name: 'clearPendingAppointmentsTrigger', cronExpression: "0/5 * * * * ?" // Testing - run every 5 seconds
    }

    void execute() {
        // Define interval for clearing appointments, in milliseconds
        def clearPendingAppointmentsIntervalMillis = 60 * AppConstant.PENDING_APPOINTMENTS_CLEAR_INTERVAL_MINUTES * 1000

        // Get current date and time
        def currentDateTime = new Date()

        // Get start date and time for the current pending appointment interval
        def offsetDateTime = new Date()
        offsetDateTime.setTime(currentDateTime.getTime() - clearPendingAppointmentsIntervalMillis)

        // Testing
        // println 'Job run! ' + currentDateTime.toString() + ' ' + offsetDateTime.toString()

        // Delete pending appointments that were created before the current pending appointment interval
        PendingAppointment.where {
            dateCreated <= offsetDateTime
        }.deleteAll()
    }
}
