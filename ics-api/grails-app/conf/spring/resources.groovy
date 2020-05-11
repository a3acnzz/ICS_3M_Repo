package spring;

import com.mmm.SecurityService
import com.mmm.auth.CustomAuthenticationProviderService
import com.mmm.auth.CustomUserDetailsService
import com.mmm.auth.JsonAuthenticationSuccessHandler

// Place your Spring DSL code here
beans = {
    customAuthenticationProviderService(CustomAuthenticationProviderService) {
        userDetailsService = ref("userDetailsService")
    }

    restAuthenticationSuccessHandler(JsonAuthenticationSuccessHandler) {
        renderer = ref("accessTokenJsonRenderer")
        securityService = ref("securityService")
        grailsApplication = ref("grailsApplication")
    }
    securityService(SecurityService)
    userDetailsService(CustomUserDetailsService)
}
