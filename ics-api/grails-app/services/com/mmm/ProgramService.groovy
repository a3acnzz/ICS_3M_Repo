package com.mmm


import com.mmm.auth.CustomUserDetail
import com.mmm.auth.UnauthorizedException
import grails.plugin.springsecurity.SpringSecurityService
import grails.transaction.Transactional

@Transactional
class ProgramService {

    SpringSecurityService springSecurityService
    ProgramDateService programDateService
    ProgramOwnerService programOwnerService

    @Transactional(readOnly = true)
    def search(String name, Long locationId, Boolean active) {
        def results = Program.createCriteria().list() {
            name = name?.trim()

            if (name != null) {
                ilike("name", "%" + name + "%")
            }
            if (locationId != null) {
                eq("location.id", locationId)
            }
            if (active != null) {
                eq("active", active)
            }
            order("name", "asc")
        }
        return results
    }

    @Transactional(readOnly = true)
    def getProgram(Long id) {
        Program program
        if (id) {
            program = Program.get(id)
        }
        if (!program) {
            program = new Program()
            program.emailRequired = true
        }
        return program?.toJson()
    }

    @Transactional(readOnly = true)
    def getProgramAppointments(Long id) {
        return AppointmentDetailsView.findAllByProgramId(id)
    }

    @Transactional
    def save(def json) {
        if (!json) {
            return null
        }
        // Check that the program owner is authorized for the submitted location
        if (!programOwnerService.programOwnerAuthorized(json.locationId)) {
            throw new UnauthorizedException()
        }

        CustomUserDetail user = springSecurityService?.principal

        Program submittedProgram = new Program(json)
        submittedProgram.location = Location.get(json.locationId)
        Program program

        if (json.id) {
            program = Program.get(json.id)
        }
        if (!program) {
            program = new Program()
            program.createdBy = user?.username
        }
        program.lastUpdatedBy = user?.username

        program.copy(submittedProgram)
        program.save()

        programDateService.saveProgramDates(json.programDates, program)
        return program?.toJson()
    }
}
