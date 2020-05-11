package ics.api

/**
 * This interceptor class intercepts every HTTP request handled by the ICS API.
 * This class is used to add a 'Cache-control' header on every request.
 * This is useful for disabling caching in Internet Explorer.
 * Documentation and examples: https://objectcomputing.com/resources/publications/sett/september-2015-grails-3-interceptors/
 */
class CacheInterceptor {

    CacheInterceptor() {
        match controller: '*'
    }

    // The 'before' block is executed before a controller action is invoked
    boolean before() {
        // Add 'Cache-control' header to the request and set the value to 'no-cache'
        header('Cache-Control', 'no-cache')
        // Continue with the normal flow of the request
        true
    }
}
