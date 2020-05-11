package com.mmm.auth

import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication

class CustomAuthenticationProviderService implements AuthenticationProvider {

    def userDetailsService

    Authentication authenticate(Authentication authentication) {
        CustomUserDetail user = userDetailsService.loadUserByUsername(authentication.principal)
        if (user) {
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user, user.username, user.authorities)
            token.details = authentication.details
            return token
        } else {
            throw new BadCredentialsException("Login failed");
        }
        return null
    }

    boolean supports(Class<? extends Object> aClass) {
        return true
    }

}
