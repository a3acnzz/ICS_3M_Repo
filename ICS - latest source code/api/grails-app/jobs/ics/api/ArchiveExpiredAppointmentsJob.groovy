package ics.api

import com.mmm.Appointment
import com.mmm.BatchRundate

/**
 *  This job updates the archived flag for expired appointments after a set interval of time.
 *  This job runs every ten minutes on the :10s
 */
class ArchiveExpiredAppointmentsJob {

    static triggers = {
        // Run every :20s (i.e. XX:10, XX:20, XX:30, XX:40, XX:50, XX:00)
        // cron cronExpression: "0/20 * * * * ?" //every 20 sec
        //cron cronExpression: "0/10 * * * * ?" //every 10 sec
        cron cronExpression: "0 0 1 ? * *" // Fire at 1:00 AM every day
    }

    void execute() {
        Date currentDate = new Date();

        // Get Calendar object set to the date and time of the given Date object
        Calendar cal = Calendar.getInstance();
        cal.setTime(currentDate);

        // Set time fields to zero
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);

        // Put it back in the Date object
        currentDate = cal.getTime();

        def results = Appointment.findAllByArchived(false);
        for (appointment in results) {
            def appointmentobj = appointment.toJson()
            Date programDate = appointmentobj.programDate;
            Calendar calForProgramDate = Calendar.getInstance();
            calForProgramDate.setTime(programDate);

            // Set time fields to zero
            calForProgramDate.set(Calendar.HOUR_OF_DAY, 0);
            calForProgramDate.set(Calendar.MINUTE, 0);
            calForProgramDate.set(Calendar.SECOND, 0);
            calForProgramDate.set(Calendar.MILLISECOND, 0);

            programDate = calForProgramDate.getTime();
             if(programDate <  currentDate) {
                appointment.archived = true;
                appointment.save();
            }
        }
        //print "Job ArchiveExpiredAppointmentsJob run!"

        //Updating the last run date
        def batchResult = BatchRundate.findByBatch_name("Archive Expired Appointments")
        batchResult.last_rundate = new Date();
        batchResult.save();
    }
}
