package com.mmm

import grails.transaction.Transactional

@Transactional
class SignUpUserService {

    def springSecurityService
    IcsUserService icsUserService

    @Transactional(readOnly = true)
    def getUser(String userPin) {
        SignUpUser signUpUser
        SignUpUser.withTransaction {
            signUpUser = SignUpUser.findByUserPin(userPin)
        }
        if (signUpUser) {
            return removeLeadingAndTrailingSpaces(signUpUser)
        } else  {
            // For development environment and automated testing
            IcsUser icsUser = IcsUser.findByUserPin(userPin)
            if (icsUser) {
                return  icsUser
            } else {
                return [userPin: userPin]
            }
        }
    }

    @Transactional(readOnly = true)
    def search(String firstName, String lastName, String userPin) {
        def results = SignUpUser.createCriteria().list() {
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
        for (SignUpUser signUpUser : results) {
            removeLeadingAndTrailingSpaces(signUpUser)
        }
        if (results) {
            return results
        } else {
            // For development environment and automated testing
            return icsUserService.search(firstName, lastName, userPin)
        }
    }


    def removeLeadingAndTrailingSpaces(SignUpUser signUpUser) {
        if (signUpUser) {
            signUpUser.setProperty("email", signUpUser.getProperty("email").toString().trim())
            signUpUser.setProperty("firstName", signUpUser.getProperty("firstName").toString().trim())
            signUpUser.setProperty("lastName", signUpUser.getProperty("lastName").toString().trim())
            signUpUser.setProperty("userPin", signUpUser.getProperty("userPin").toString().trim())
        }
        return signUpUser
    }
}
