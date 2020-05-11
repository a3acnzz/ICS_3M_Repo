package com.mmm

import grails.core.GrailsApplication
import grails.plugin.springsecurity.annotation.Secured
import grails.plugins.GrailsPluginManager
import grails.plugins.PluginManagerAware

class ApplicationController implements PluginManagerAware {

    GrailsApplication grailsApplication
    GrailsPluginManager pluginManager

    @Secured(['ROLE_ADMIN'])
    def index() {
        [grailsApplication: grailsApplication, pluginManager: pluginManager]
    }
}
