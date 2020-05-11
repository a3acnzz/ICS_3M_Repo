package com.mmm

class ExceptionController {

    def unauthorized() {
        response.status = 403
        return response
    }
}
