package com.mmm

class IcsUser {

    String userPin
    String firstName
    String lastName
    String email

    static hasMany = [roles: Role]

    static constraints = {
        userPin maxSize: 15
        firstName maxSize: 30
        lastName maxSize: 30
        email maxSize: 50
    }

    static mapping = {
        id name: 'userPin', generator: 'assigned'
        roles joinTable: [name: 'ics_user_role', key: 'user_pin']
    }
}
