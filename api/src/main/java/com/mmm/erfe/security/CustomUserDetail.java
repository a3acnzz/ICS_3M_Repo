package com.mmm.erfe.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

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
public class CustomUserDetail extends User {
	/**
	 * Static final variable
	 * 
	 * @author Rajkumar
	 * @param void
	 * @return void
	 *
	 */
	final String prsnName;
	/**
	 * Static final variable
	 * 
	 * @author Rajkumar
	 * @param void
	 * @return void
	 *
	 */
	final String personId;

	/**
	 * Parameterized constructor
	 * 
	 * @author Rajkumar
	 * @param username-String, password-String, enabled-boolean,
	 *                         accountNonExpired-boolean,
	 *                         credentialsNonExpired-boolean,
	 *                         accountNonLocked-boolean,
	 *                         authorities-Collection<GrantedAuthority>,
	 *                         prsnName-String, personId-String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public CustomUserDetail(String username, String password, boolean enabled, boolean accountNonExpired,
			boolean credentialsNonExpired, boolean accountNonLocked, Collection<GrantedAuthority> authorities,
			String prsnName, String personId) {
		super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);

		this.prsnName = prsnName;
		this.personId = personId;
	}
	public String getPrsnName() {
		return prsnName;
	}

	public String getPersonId() {
		return personId;
	}
}
