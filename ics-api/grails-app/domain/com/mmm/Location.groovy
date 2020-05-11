package com.mmm

import groovy.json.JsonBuilder

class Location {

	String name
	String code
	TimeZone timeZone
	boolean active
	boolean showInSignUpList
	Date dateCreated
	Date lastUpdated
	String createdBy
	String lastUpdatedBy

	static constraints = {
		name maxSize: 200, unique: true
		code maxSize: 50, unique: true
		timeZone maxSize: 50
		createdBy maxSize: 15
		lastUpdatedBy maxSize: 15
    }

	def copy(Location that) {
		name = that.name
		code = that.code
		timeZone = that.timeZone
		active = that.active
		showInSignUpList = that.showInSignUpList
	}

	def toJson() {
		def json = new JsonBuilder()
		def jsonData = json {
			id this?.id
			name this?.name
			programs getPrograms(this ?: 0) ?: []
		}
		return jsonData
	}

		def getPrograms(Location location) {

		if (!location?.id) {
			return null
		}

		return Program.findAllByLocationAndActive(location, true).collect {
			[
					id: it.id,
					name: it.name,
					programDates: getProgramDates(it ?: 0) ?: []
			]
		}
	}

	def getProgramDates(Program program) {

		if (!program?.id) {
			return null
		}

		return ProgramDate.findAllByProgram(program).collect {
			[
					id: it.id,
					date: it.date,
					timeSlots: getTimeSlots(it ?: 0) ?: []
			]
		}
	}

	def getTimeSlots(ProgramDate programDate) {
		if (!programDate?.id) {
			return null
		}

		return TimeSlot.findAllByProgramDate(programDate).collect {
			[
					id: it.id,
					startTime: it.startTime,
					endTime: it.endTime,
					maxAppointments: it.maxAppointments
			]
		}
	}
}
