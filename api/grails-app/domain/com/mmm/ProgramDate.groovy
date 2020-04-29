package com.mmm

class ProgramDate {

	Program program
	Date date
	Date dateCreated
	Date lastUpdated
	String createdBy
	String lastUpdatedBy

	static constraints = {
		date unique: 'program'
		createdBy maxSize: 15
		lastUpdatedBy maxSize: 15
	}

	def copy(ProgramDate that) {
		date = that.date.clearTime()
		program = that.program
	}
}
