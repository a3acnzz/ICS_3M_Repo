package com.mmm

import java.sql.Time

class TimeSlot {
	ProgramDate programDate
	int maxAppointments
	Time startTime
	Time endTime
	String startTimeDisplay
	String endTimeDisplay
	Date dateCreated
	Date lastUpdated
	String createdBy
	String lastUpdatedBy

	int availableAppointmentsCount

	static  transients = ['availableAppointmentsCount']

	static constraints = {
		programDate unique: ['startTime', 'endTime']
		startTimeDisplay maxSize: 8
		endTimeDisplay maxSize: 8
		createdBy maxSize: 15
		lastUpdatedBy maxSize: 15
	}

	def copy(TimeSlot that) {
		startTime = that.startTime
		endTime = that.endTime
		startTimeDisplay = that.startTimeDisplay
		endTimeDisplay = that.endTimeDisplay
		maxAppointments = that.maxAppointments
		programDate = that.programDate
	}
}