package com.mmm

import grails.transaction.Transactional
import net.fortuna.ical4j.util.ResourceLoader

@Transactional
class LocationService {

    def springSecurityService
    ProgramOwnerService programOwnerService

    @Transactional(readOnly = true)
    def getSignUpLocations() {
        return Location.findAllByActiveAndShowInSignUpList(true, true, [sort: "name"])
    }

    @Transactional(readOnly = true)
    def getProgramOwnerLocations() {
        IcsUser user = IcsUser.get(springSecurityService.principal?.username)
        Role adminRole = Role.get(AppConstant.ROLE_ADMIN)

        List<Location> locationList = []

        // If user is admin, return every active location for program owners page
        // Else return locations the program owner is actively assigned to
        if (user?.roles?.contains(adminRole)) {
            locationList = Location.findAllByActive(true, [sort: "name"])
        } else {
            def programOwner = ProgramOwner.findAllByIcsUser(user)
            programOwner?.each { owner ->
                locationList.push(owner.location)
            }
        }
        return locationList
    }

    @Transactional(readOnly = true)
    def getAdminLocations() {
        return Location.findAll([sort: "name"])
    }

    @Transactional(readOnly = true)
    def getLocation(Long id) {
        return Location.get(id)
    }

    @Transactional(readOnly = true)
    def getLocationByCode(String code) {
        return Location.findByCode(code)
    }

    def getTimeZones() {
        // Note: Java has some time zones that are not supported by the iCal4J library (e.g. Java's "CST" is not supported by iCal4j)
        // Using a time zone that is not supported by iCal4j will result in an error when creating the .ics file during appointment sign-up
        // Using a named time zone such as 'America/Chicago' is advantageous due to support for daylight savings time

        // List of time zones supported by Java
        def javaTimeZoneList = TimeZone.getAvailableIDs()

        // List of time zones supported by the iCal4j library
        def iCal4jTimeZoneList = []

        for (javaTimeZone in javaTimeZoneList) {
            // Check that Java time zone is supported by the iCal4j library, by checking for an .ics definition file in iCal4j
            // This code is taken from the loadVTimeZone method in the TimeZoneRegistryImpl class in iCal4j
            URL resource = ResourceLoader.getResource("zoneinfo-outlook/" + javaTimeZone + ".ics");
            // Add the time zone to the validated list if the time zone is supported by the iCal4j
            if (resource != null) {
                iCal4jTimeZoneList.add(javaTimeZone)
            }
        }

        // Return unique, sorted list of time zones supported by iCal4j
        return iCal4jTimeZoneList.unique().sort()
    }

    @Transactional
    def save(def json) {
        if (!json) {
            return null
        }
        Location submittedLocation = new Location(json)
        Location location

        if (json.id) {
            location = Location.get(json.id)
        }
        if (!location) {
            location = new Location()
            location.createdBy = springSecurityService.principal?.username
        }
        location.lastUpdatedBy = springSecurityService.principal?.username
        location.copy(submittedLocation)
        location.save()
        programOwnerService.saveList(json.programOwnerList, location)
        return location
    }
}
