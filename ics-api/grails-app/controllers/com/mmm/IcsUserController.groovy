package com.mmm

import grails.plugin.springsecurity.annotation.Secured

class IcsUserController {
    static responseFormats = ['json']

    IcsUserService icsUserService

    @Secured(['ROLE_USER'])
    def getUser() {
        respond icsUserService.getUser()
    }

    @Secured(['ROLE_USER'])
    def search (String firstName, String lastName, String userPin) {
        respond icsUserService.search(firstName, lastName, userPin)
    }

    @Secured(['ROLE_ADMIN'])
    def getAdminUserList() {
        respond icsUserService.getAdminUserList()
    }

    @Secured(['ROLE_ADMIN'])
    def saveAdminUserList() {
        respond icsUserService.saveAdminUserList(request.JSON)
    }
}
