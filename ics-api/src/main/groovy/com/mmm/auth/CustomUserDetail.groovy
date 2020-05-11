package com.mmm.auth

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.User

class CustomUserDetail extends User {

    final String firstName
    final String lastName
    final String email

    CustomUserDetail(String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, Collection<GrantedAuthority> authorities, String firstName, String lastName, String email) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities)
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
    }
}
