package com.mmm

import grails.transaction.Transactional

@Transactional
class IcsUserService {

    def springSecurityService

    def getUser() {
        return IcsUser.findByUserPin(springSecurityService.principal?.username)
    }

    @Transactional(readOnly = true)
    def search(String firstName, String lastName, String userPin) {
        def results = IcsUser.createCriteria().list() {
            firstName = firstName?.trim()
            lastName = lastName?.trim()
            userPin = userPin?.trim()

            if (firstName != null) {
                ilike("firstName", "%" + firstName + "%")
            }
            if (lastName != null) {
                ilike("lastName", "%" + lastName + "%")
            }
            if (userPin != null) {
                ilike("userPin", "%" + userPin + "%")
            }
            maxResults(100) // TODO: Make this a constant
            order("firstName", "asc")
            order("lastName", "asc")
        }
        return results
    }

    @Transactional(readOnly = true)
    def getAdminUserList() {
        def adminUserList = IcsUser.createCriteria().list {
            roles {
                eq('code', AppConstant.ROLE_ADMIN)
            }
        }
        return adminUserList
    }

    @Transactional
    def saveAdminUserList(def adminUserJson) {

        if (!adminUserJson) {
            return null
        }
        List<IcsUser> submittedAdminUserList = []
        List<IcsUser> existingAdminUserList = (List<IcsUser>) getAdminUserList()
        Role adminRole = Role.get(AppConstant.ROLE_ADMIN)

        IcsUser icsUser
        // Initialize list of submitted admin users
        for (record in adminUserJson) {
            icsUser = IcsUser.get(record.userPin)

            // Initialize a new ICS user if needed
            if (!icsUser) {
                icsUser = new IcsUser()
                icsUser.userPin = record.userPin
                icsUser.firstName = record.firstName
                icsUser.lastName = record.lastName
                icsUser.email = record.email
            }

            submittedAdminUserList.push(icsUser)
        }

        // Save submitted adminUsers
        for (adminUser in submittedAdminUserList) {
            if (!existingAdminUserList.contains(adminUser)) {
                adminUser.addToRoles(adminRole)
                adminUser.save()
            }
        }

        // Remove admin users not in submitted list
        for (adminUser in existingAdminUserList) {
            if (!submittedAdminUserList.contains(adminUser)) {
                adminUser.removeFromRoles(adminRole)
                // If ICS user has no roles assigned (ROLE_ADMIN or ROLE_PROG_OWNER), remove them from the ICS_USER table entirely
                if (adminUser.roles?.size() < 1) {
                    adminUser.delete()
                } else {
                    adminUser.save()
                }
            }
        }
        return getAdminUserList()
    }
}
