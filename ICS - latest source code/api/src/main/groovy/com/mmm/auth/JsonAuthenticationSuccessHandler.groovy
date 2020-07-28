package com.mmm.auth

import grails.converters.JSON
import grails.core.GrailsApplication
import grails.plugin.springsecurity.rest.RestAuthenticationSuccessHandler
import grails.plugin.springsecurity.rest.token.AccessToken
import grails.plugin.springsecurity.rest.token.rendering.AccessTokenJsonRenderer
import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import org.springframework.security.core.Authentication

import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JsonAuthenticationSuccessHandler extends RestAuthenticationSuccessHandler  {

    AccessTokenJsonRenderer renderer
    def securityService
    GrailsApplication grailsApplication

    @Override
    void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        CustomUserDetail user = (CustomUserDetail) authentication.principal
        response.contentType = 'application/json'
        response.characterEncoding = 'UTF-8'
        response.addHeader 'Cache-Control', 'no-store'
        response.addHeader 'Pragma', 'no-cache'
        String token = renderer.generateJson(authentication as AccessToken)

        def jsonSlurper = new JsonSlurper()
        def jsonData = jsonSlurper.parseText(token)

        jsonData.version = grailsApplication.metadata.getApplicationVersion()
        jsonData.lastName = user?.lastName
        jsonData.firstName = user?.firstName
        jsonData.email = user?.email
        jsonData.roles = user?.authorities?.role
        response << JsonOutput.toJson(jsonData)
    }
}
