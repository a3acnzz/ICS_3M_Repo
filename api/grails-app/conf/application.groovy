// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.rest.login.useJsonCredentials = true
grails.plugin.springsecurity.rest.login.failureStatusCode = 401
grails.plugin.springsecurity.rest.login.endpointUrl = '/api/login'
grails.plugin.springsecurity.rest.token.validation.useBearerToken = true
grails.plugin.springsecurity.rest.login.active = true
grails.plugin.springsecurity.rest.login.usernamePropertyName = 'username'
grails.plugin.springsecurity.rest.login.passwordPropertyName = 'password'

grails.plugin.springsecurity.providerNames = [
        'customAuthenticationProviderService',
        'anonymousAuthenticationProvider']

grails.plugin.springsecurity.controllerAnnotations.staticRules = [
        [pattern: '/api/login', access: ['permitAll']],
        [pattern: '/E2E/**', access: ['permitAll']],
        [pattern: '/status/**', access: ['permitAll']],
        [pattern: '/**',   access: ['IS_AUTHENTICATED_FULLY']]
]

grails.plugin.springsecurity.filterChain.chainMap = [
        //Stateless chain
        [
                pattern: '/**',
                filters: 'JOINED_FILTERS, -exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter,-rememberMeAuthenticationFilter'
        ],
        // Stateful chain, need to be able to set JSESSIONID for websocket functionality in load-balanced environments
        [
                pattern: '/stomp/**',
                filters: 'JOINED_FILTERS,-exceptionTranslationFilter,-securityContextPersistenceFilter'
        ]
]

grails.gorm.failOnError = true

grails.gorm.default.mapping = {
    version false
}

grails {
    mail {
        host = "mailserv.mmm.com"
        port = 25
        props = ["mail.transport.protocol": "smtp"]
    }
}

asynchronous.mail.default.attempt.interval=300000l      // Five minutes
asynchronous.mail.default.max.attempts.count=3
asynchronous.mail.send.repeat.interval=60000l           // One minute
asynchronous.mail.expired.collector.repeat.interval=607000l
asynchronous.mail.messages.at.once=100
asynchronous.mail.send.immediately=true
asynchronous.mail.clear.after.sent=false
asynchronous.mail.disable=false
asynchronous.mail.useFlushOnSave=true
asynchronous.mail.persistence.provider='hibernate'     // Possible values are 'hibernate', 'hibernate4', 'mongodb'
asynchronous.mail.newSessionOnImmediateSend=false
asynchronous.mail.taskPoolSize=1