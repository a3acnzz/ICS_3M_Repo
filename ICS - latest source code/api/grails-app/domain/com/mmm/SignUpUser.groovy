package com.mmm

class SignUpUser {

    String userPin
    String firstName
    String lastName
    String email
    String employeeNo

    static constraints = {
        userPin maxSize: 15
        firstName maxSize: 30
        lastName maxSize: 30
        email maxSize: 50
    }

    static mapping = {
        datasource 'eid'
        table 'VEIDUSF1000804140ICS_WD'
        id name: 'employeeNo', generator: 'assigned'
        userPin column: 'USER_PIN'
        firstName column: 'PRSN_FRST_NAME'
        lastName column: 'PRSN_LAST_NAME'
        email column: 'EMAL_ADDR'
        employeeNo column: 'PRSN_ID'
    }
}

//VEIDUSF1000804140ICS_WD = In prod
//VEIDUSF832160ICS_WD = our table  
