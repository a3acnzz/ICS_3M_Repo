package com.mmm

import java.sql.Time

class ProgramDateTimeSlotView {

	// Id column is time slot id
	Long programDateId
	Time startTime
	Time endTime
	String startTimeDisplay
	String endTimeDisplay
	Long maxAppointments
	Long availableAppointments
}
