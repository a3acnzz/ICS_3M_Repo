package com.mmm

import groovy.json.JsonBuilder
import java.text.SimpleDateFormat

class Appointment {

	TimeSlot timeSlot
	String firstName
	String lastName
	String emailAddress
	String pin
	Date dateCreated
	Date lastUpdated
	String createdBy
	String lastUpdatedBy
	Boolean archived

    static constraints = {
		firstName maxSize: 30
		lastName maxSize: 30
		emailAddress maxSize: 50, nullable: true
		pin maxSize: 15, nullable: true
		createdBy maxSize: 15
		lastUpdatedBy maxSize: 15
    }

	static mapping = {
	archived defaultValue: false
	}

	def copy(Appointment that) {
		firstName = that.firstName
		lastName = that.lastName
		emailAddress = that.emailAddress
		pin = that.pin
		timeSlot = that.timeSlot
		archived = that.archived

	}

	def toJson() {
		def createdByUser = SignUpUser.findByUserPin(this?.createdBy)

		if (!createdByUser) {
			createdByUser = IcsUser.findByUserPin(this?.createdBy)
		}

		def json = new JsonBuilder()
		def jsonData = json {
			id this?.id
			firstName this?.firstName
			lastName this?.lastName
			emailAddress this?.emailAddress
			pin this?.pin
			startTimeDisplay this?.timeSlot?.startTimeDisplay
			endTimeDisplay this?.timeSlot?.endTimeDisplay
			programDate this?.timeSlot?.programDate?.date
			programDateDisplay getFormattedDateString(this?.timeSlot?.programDate?.date)
			programName this?.timeSlot?.programDate?.program?.name
			createdByFirstName createdByUser?.firstName
			createdByLastName createdByUser?.lastName
			programId this?.timeSlot?.programDate?.programId
			programDateId this?.timeSlot?.programDateId
			timeSlotId this?.timeSlotId
			locationId this?.timeSlot?.programDate?.program?.locationId
			startTime this?.timeSlot.startTime.toString()
			endTime this?.timeSlot.endTime.toString()
			venue this?.timeSlot?.programDate?.program.venue
		}
		return jsonData
	}

	def getFormattedDateString(date) {
		SimpleDateFormat sdfDisplay = new SimpleDateFormat('MM/dd/yyyy'); //yyyy-MM-dd
		String formattedProgramDateDisplay = sdfDisplay.format(date);
		return formattedProgramDateDisplay;
	}
}
