package com.mmm

import com.mmm.auth.CustomUserDetail
import grails.plugin.springsecurity.SpringSecurityService
import grails.transaction.Transactional

import java.text.SimpleDateFormat

@Transactional
class ProgramDateService {

	SpringSecurityService springSecurityService
	TimeSlotService timeSlotService

	@Transactional(readOnly = true)
	def getProgramDates(Long programId) {

		// Get list of program date IDs
		Program program = Program.load(programId)
		List programDateIdList = ProgramDate.findAllByProgram(program)*.id

		// If no dates, return empty list
		if (!programDateIdList) {
			return []
		}

		// Get program date IDs with at least one available slot
		List availableProgramDateIdList = ProgramDateTimeSlotView.findAllByProgramDateIdInListAndAvailableAppointmentsGreaterThan(programDateIdList, 0)*.programDateId.unique()

		// To find total available appointments
		long totalAvailableAppointments = 0
		List availableAppointmentsList = ProgramDateTimeSlotView.findAllByProgramDateIdInListAndAvailableAppointmentsGreaterThan(programDateIdList, 0)*.availableAppointments

		if(availableAppointmentsList) {
			for (int i = 0; i < availableAppointmentsList.size(); i++) {
				totalAvailableAppointments = totalAvailableAppointments + availableAppointmentsList.get(i)
			}
		}

		// If no available dates, return empty list
		if (!availableProgramDateIdList) {
			return []
		}

		// Get program dates - with at least one available time slot - by Id and in sorted order
		def results = ProgramDate.findAllByIdInList(availableProgramDateIdList, [sort: 'date'])

		return results.collect {
			[
				id         : it.id,
				date       : it.date,
				displayDate: getFormattedDateString(it.date),
				totalAvailableAppointments: totalAvailableAppointments
			]
		}
	}

	private getFormattedDateString(date) {
		SimpleDateFormat sdfDisplay = new SimpleDateFormat('MM/dd/yyyy')
		String formattedProgramDateDisplay = sdfDisplay.format(date)
		return formattedProgramDateDisplay
	}

	@Transactional
	protected saveProgramDates(def programDates, Program program) {

		CustomUserDetail user = springSecurityService?.principal

		if (!program || programDates?.size() == 0) {
			return null
		}

		ProgramDate programDate
		ProgramDate submittedProgramDate
		for (newProgramDate in programDates) {
			submittedProgramDate = new ProgramDate(newProgramDate)
			submittedProgramDate.program = program

			if (newProgramDate.id) {
				programDate = ProgramDate.get(newProgramDate.id)
			} else {
				programDate = new ProgramDate()
				programDate.createdBy = user?.username
			}

			if (programDate) {
				programDate.lastUpdatedBy = user?.username
				programDate.copy(submittedProgramDate)
				programDate.save()
			}

			timeSlotService.saveTimeSlots(newProgramDate.timeSlots, programDate)
		}
	}

	@Transactional
	def cancel(def json) {
		if (!json) {
			return null
		}

		def programDateId = json.programDateId

		if (programDateId) {
			ProgramDate programDate = ProgramDate.get(programDateId)
			if (programDate) {
				List<TimeSlot> timeSlots = TimeSlot.findAllByProgramDate(programDate)

				timeSlots?.each { timeSlot ->
					timeSlotService.decreaseMaxAppointments(timeSlot, timeSlot.maxAppointments)
					timeSlot.delete(flush: true)
				}
				programDate.delete()
			}
		}
		return []
	}

	@Transactional
	def increaseMaxAppointments(def json) {
		if (!json) {
			return null
		}

		def programDateId = json.programDateId
		def maxAppointmentsChange = json.maxAppointmentsChange

		if (programDateId) {
			ProgramDate programDate = ProgramDate.get(programDateId)
			if (programDate) {
				// Use HQL to issue one update statement for better performance instead of looping through time sl
				TimeSlot.executeUpdate("UPDATE TimeSlot T SET T.maxAppointments = T.maxAppointments + :change WHERE programDate = :date", [change: maxAppointmentsChange, date: programDate])
				return programDate
			}
		}
		return null
	}

	@Transactional
	def decreaseMaxAppointments(def json) {
		if (json?.size() == 0) {
			return null
		}

		def programDateId = json.programDateId
		def maxAppointmentsChange = json.maxAppointmentsChange

		if (programDateId) {
			ProgramDate programDate = ProgramDate.get(programDateId)
			if (programDate) {
				List<TimeSlot> timeSlots = TimeSlot.findAllByProgramDate(programDate)

				timeSlots?.each { timeSlot ->
					timeSlotService.decreaseMaxAppointments(timeSlot, maxAppointmentsChange)
				}
				return timeSlots
			}
		}
		return null
	}
}
