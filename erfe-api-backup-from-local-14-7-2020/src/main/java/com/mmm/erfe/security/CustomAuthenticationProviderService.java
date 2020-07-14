package com.mmm.erfe.security;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * 
 * @author Rajkumar
 *
 */
public class CustomAuthenticationProviderService implements AuthenticationProvider {

	/**
	 * Dynamic object creation
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return Object of CustomUserDetailsService
	 *
	 */
	CustomUserDetailsService userDetailsService;

	/**
	 * JWT token generation
	 * 
	 * @author Rajkumar
	 * @param authentication-Authentication
	 * @throws BadCredentialsException
	 * @return JWT token
	 * 
	 */
	public Authentication authenticate(Authentication authentication) {
		UserDetails user = userDetailsService.loadUserByUsername(authentication.getName());
		if (user != null) {
			UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user,
					user.getUsername(), user.getAuthorities());
			token.setDetails(authentication.getDetails());
			return token;
		} else {
			throw new BadCredentialsException("Login failed");
		}
	}

	/**
	 * Testing
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return boolean
	 * 
	 */
	public boolean supports(Class<? extends Object> aClass) {
		return true;
	}

}
