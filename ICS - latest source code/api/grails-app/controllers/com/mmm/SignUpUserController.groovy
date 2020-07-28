package com.mmm

import grails.plugin.springsecurity.annotation.Secured

class SignUpUserController {
    static responseFormats = ['json']

    SignUpUserService signUpUserService

    @Secured(['ROLE_USER'])
    def getUser(String userPin) {
        respond signUpUserService.getUser(userPin)
    }

    @Secured(['ROLE_USER'])
    def search (String firstName, String lastName, String userPin) {
        respond signUpUserService.search(firstName, lastName, userPin)
    }
}
