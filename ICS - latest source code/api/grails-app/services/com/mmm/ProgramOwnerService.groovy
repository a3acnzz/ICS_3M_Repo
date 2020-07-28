package com.mmm

import com.mmm.auth.CustomUserDetail
import com.mmm.auth.UnauthorizedException
import grails.plugin.springsecurity.SpringSecurityService
import grails.transaction.Transactional

@Transactional
class ProgramOwnerService {

	SpringSecurityService springSecurityService
	ProgramService programService

	@Transactional(readOnly = true)
	def search(Long locationId, Long userId) {
		List<ProgramOwner> results = ProgramOwner.createCriteria().list() {
			if (locationId != null) {
				eq("location", Location.load(locationId))
			}
			if (userId != null) {
				eq("icsUser", IcsUser.load(userId))
			}
			order("icsUser", "asc")
		}
		return results.collect { r ->
			[
				locationId: r.location?.id ?: 0,
				location  : r.location?.code ?: "",
				userPin   : r.icsUser?.userPin ?: "",
				firstName : r.icsUser?.firstName ?: "",
				lastName  : r.icsUser?.lastName ?: "",
			]
		}
	}

	@Transactional
	def saveList(def programOwnerJson, Location location) {
		List<ProgramOwner> submittedProgramOwnerList = [];

		IcsUser icsUser
		// Initialize list of submitted program owners
		for (record in programOwnerJson) {
			icsUser = IcsUser.get(record.userPin)

			// Initialize a new ICS user if needed
			if (!icsUser) {
				icsUser = new IcsUser()
				icsUser.userPin = record.userPin
				icsUser.firstName = record.firstName
				icsUser.lastName = record.lastName
				icsUser.email = record.email
				icsUser.save(flush: true)
			}

			ProgramOwner programOwner = ProgramOwner.findOrCreateWhere(location: location, icsUser: icsUser)
			if (programOwner) {
				submittedProgramOwnerList.push(programOwner)
			}
		}

		// Save submitted program owners
		for (programOwner in submittedProgramOwnerList) {
			icsUser = programOwner.icsUser
			programOwner.save()
			addProgramOwnerRole(icsUser)
		}

		// Create list of all program owners for given location
		def locationProgramOwnerList = ProgramOwner.findAllByLocation(location)

		// Remove program owners not in submitted list
		for (programOwner in locationProgramOwnerList) {
			if (!submittedProgramOwnerList.contains(programOwner)) {
				icsUser = programOwner.icsUser
				programOwner.delete()
				removeProgramOwnerRole(icsUser)
			}
		}
		return search(location.id, null)
	}

	private static addProgramOwnerRole(IcsUser icsUser) {
		if (!icsUser) {
			return null
		}
		int numberAssignedLocations = ProgramOwner.countByIcsUser(icsUser)

		// If this is the first time a user is being added as a program owner, assign them the program owner role
		if (numberAssignedLocations > 0 && !icsUser.roles?.contains(AppConstant.ROLE_PROGRAM_OWNER)) {
			icsUser.addToRoles(Role.get(AppConstant.ROLE_PROGRAM_OWNER))
			icsUser.save()
		}
	}

	private static removeProgramOwnerRole(IcsUser icsUser) {
		if (!icsUser) {
			return null
		}
		int numberAssignedLocations = ProgramOwner.countByIcsUser(icsUser)

		// If a user has been removed from all locations, remove their program owner role
		if (numberAssignedLocations < 1) {
			icsUser.removeFromRoles(Role.get(AppConstant.ROLE_PROGRAM_OWNER))
			icsUser.save()
			removeIcsUser(icsUser)
		}
	}

	private static removeIcsUser(IcsUser icsUser) {
		if (!icsUser) {
			return null
		}
		// If a user has no roles assigned (ROLE_ADMIN or ROLE_PROG_OWNER), remove them from the ICS_USER table entirely
		if (icsUser.roles?.size() < 1) {
			icsUser.delete()
		}
	}

	@Transactional(readOnly = true)
	def getLocationPrograms(Long locationId) {
		if (programOwnerAuthorized(locationId)) {
			return programService.search(null, locationId, null)
		} else {
			throw new UnauthorizedException()
		}
	}

	@Transactional(readOnly = true)
	def getProgram(Long locationId, Long programId) {
		if (programOwnerAuthorized(locationId)) {
			return programService.getProgram(programId)
		} else {
			throw new UnauthorizedException()
		}
	}

	@Transactional(readOnly = true)
	def getProgramAppointments(Long locationId, Long programId) {
		if (programOwnerAuthorized(locationId)) {
			return programService.getProgramAppointments(programId)
		} else {
			System.out.println("exception");
			throw new UnauthorizedException()
		}
	}

	@Transactional(readOnly = true)
	protected programOwnerAuthorized(Long locationId) {
		System.out.println("Inside pg authorized");
		CustomUserDetail user = springSecurityService?.principal
		IcsUser icsUser = IcsUser.get(user?.username)
		Location location = Location.load(locationId)
		ProgramOwner programOwner = ProgramOwner.findByLocationAndIcsUser(location, icsUser)
		Role adminRole = Role.get(AppConstant.ROLE_ADMIN)
		System.out.println(IcsUser.get(user?.username));
		if (programOwner) {
			System.out.println("This is pg");
			return true
		} else if (icsUser?.roles?.contains(adminRole)) {
			System.out.println("This is ad");
			return true
		} else {
			System.out.println("This is none so returning false");
			return false
		}
	}
}