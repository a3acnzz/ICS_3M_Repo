package com.mmm

import groovy.json.JsonBuilder

class Program {

	Location location
	String name
	String venue
	boolean active
	boolean emailRequired
	boolean recursiveApp
	Date dateCreated
	Date lastUpdated
	String createdBy
	String lastUpdatedBy
	Long minAppointmentsPerUser
	Long maxAppointmentsPerUser

	static constraints = {
		name maxSize: 100, unique: 'location'
		venue maxSize: 50
		createdBy maxSize: 15
		lastUpdatedBy maxSize: 15
	}

	def copy(Program that) {
		name = that.name
		active = that.active
		emailRequired = that.emailRequired
		location = Location.get(that.locationId)
		venue = that.venue
		minAppointmentsPerUser = that.minAppointmentsPerUser
		maxAppointmentsPerUser = that.maxAppointmentsPerUser
		recursiveApp=that.recursiveApp
	}

	def toJson() {
		def json = new JsonBuilder()
		def jsonData = json {
			id this?.id
			name this?.name
			active this?.active
			emailRequired this?.emailRequired
			locationId this?.location?.id
			programDates getProgramDates(this ?: 0) ?: []
			venue this?.venue
			minAppointmentsPerUser this?.minAppointmentsPerUser
			maxAppointmentsPerUser this?.maxAppointmentsPerUser
			recursiveApp this?.recursiveApp
		}
		return jsonData
	}

	def getProgramDates(Program program) {

		if (!program?.id) {
			return null
		}

		return ProgramDate.findAllByProgram(program, [sort: 'date']).collect {
			[
				id         : it.id,
				date       : it.date,
				displayDate: it.date.format(AppConstant.DISPLAY_DATE_FORMAT),
				timeSlots  : getTimeSlots(it ?: 0) ?: []]
		}
	}

	def getTimeSlots(ProgramDate programDate) {
		if (!programDate?.id) {
			return null
		}

		return ProgramDateTimeSlotView.findAllByProgramDateId(programDate.id, [sort: 'startTime']).collect {
			[
				id                   : it.id,
				startTime            : it.startTime.toString(), // Return as a string in 24-hour HH:mm:ss format, useful for sorting and comparisons, stored as Time data type in the database
				endTime              : it.endTime.toString(), // Return as a string in 24-hour HH:mm:ss format, useful for sorting and comparisons, stored as Time data type in the database
				startTimeDisplay     : it.startTimeDisplay,
				endTimeDisplay       : it.endTimeDisplay,
				maxAppointments      : it.maxAppointments,
				availableAppointments: it.availableAppointments
			]
		}
	}
}
