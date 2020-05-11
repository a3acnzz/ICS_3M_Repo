package com.mmm

class ProgramOwner implements Serializable {

    Location location
    IcsUser icsUser

    static constraints = {
    }

    static mapping = {
        id composite: ['location', 'icsUser']
        icsUser column: 'USER_PIN'
    }
}
