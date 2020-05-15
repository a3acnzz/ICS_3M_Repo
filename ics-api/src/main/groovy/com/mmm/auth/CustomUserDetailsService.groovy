package com.mmm.auth

import com.mmm.AppConstant
import com.mmm.IcsUser
import com.mmm.SignUpUser
import grails.plugin.springsecurity.userdetails.GrailsUserDetailsService
import grails.plugin.springsecurity.userdetails.NoStackUsernameNotFoundException
import grails.transaction.Transactional
import groovy.util.logging.Commons
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes

@Commons
class CustomUserDetailsService implements GrailsUserDetailsService {

    static final SimpleGrantedAuthority ROLE_USER = new SimpleGrantedAuthority("ROLE_USER")

    UserDetails loadUserByUsername(String username, boolean loadRoles) throws UsernameNotFoundException {
        return loadUserByUsername(username)
    }

    @Transactional(readOnly = true, noRollbackFor = [IllegalArgumentException, UsernameNotFoundException])
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // Get user pin (a-number) from single sign on
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        if (!username) {
            username = attr?.getRequest()?.cookies?.find { AppConstant.HEADER_USER_NAME == it.name }?.value
        }

        // First check if user logging in is an ICS user
        IcsUser icsUser = IcsUser.findByUserPin(username)
        if (icsUser) {
            // Get roles for ICS User
            List roles = getRoles(icsUser)
            // Add ROLE_USER role - everyone gets this at login so we don't have to store this user role in the database
            roles.add(ROLE_USER)
            return new CustomUserDetail(icsUser.userPin?.trim(), icsUser.userPin?.trim(), true, true, true, true, roles, icsUser.firstName, icsUser.lastName, icsUser.email)
        }

        // If the user logging in is not an ICS user, look for them in the EID view. If the user is in the EID view, they have ROLE_USER access to the application
        SignUpUser signUpUser = SignUpUser.findByUserPin(username)
        if (!signUpUser) {
            // If the user logging in is not in the EID view, throw security exception
            throw new NoStackUsernameNotFoundException()
        } else {
            // Add ROLE_USER role - everyone gets this at login so we don't have to store this user role in the database
            List<GrantedAuthority> roles = new ArrayList()
            roles.add(ROLE_USER)
            return new CustomUserDetail(signUpUser.userPin?.trim(), signUpUser.userPin?.trim(), true, true, true, true, roles, signUpUser.firstName, signUpUser.lastName, signUpUser.email)
        }
    }

    private static def getRoles(IcsUser user) {
        SimpleGrantedAuthority auth
        List<GrantedAuthority> roles = new ArrayList()
        user.roles.code.each {
            if (it) {
                auth = new SimpleGrantedAuthority(it)
                roles.add(auth)
            }
        }
        return roles
    }
}