package com.mmm.erfe.domain;

import java.io.Serializable;

/**
 * 
 * @author Senthil
 *
 */

/**
 * @author Senthil
 *
 */
public class AuthenticationResponse implements Serializable {

	/**
	 * Get type field of (AuthenticationResponse) table
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return type of type String
	 *
	 */
	public String getType() {
		return type;
	}

	/**
	 * token-Variable of type String
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private final String token;

	/**
	 * type-Variable of type String
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private final String type = "Bearer";

	/**
	 * Parameterized Constructor
	 * 
	 * @author Senthil
	 * @param token-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public AuthenticationResponse(String token) {
		this.token = token;
	}

	/**
	 * Get token field of (AuthenticationResponse) table
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return token of type String
	 *
	 */
	public String getToken() {
		return token;
	}
}
