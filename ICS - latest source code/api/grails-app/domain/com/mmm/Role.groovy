package com.mmm

class Role {

    String code

    static belongsTo = IcsUser
    static hasMany = [users: IcsUser]

    static constraints = {
        code maxSize: 20
    }

    static mapping = {
        id name: 'code', generator: 'assigned'
        users joinTable: [name: 'ics_user_role', key: 'role_code']
    }
}
