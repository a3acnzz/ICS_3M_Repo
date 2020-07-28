package ics.api

import com.mmm.auth.UnauthorizedException

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(controller: 'application', action:'index')
        "500"(controller: 'exception', action: 'unauthorized', exception: UnauthorizedException)
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
