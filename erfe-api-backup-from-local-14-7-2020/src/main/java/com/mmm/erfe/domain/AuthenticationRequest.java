package com.mmm.erfe.domain;

import java.io.Serializable;

/**
 * 
 * @author Senthil

 *
 */

/**
 * @author SenthilF
 *
 */
public class AuthenticationRequest implements Serializable {

	/**
	 * username-Variable of type String
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private String username;

	/**
	 * password-Variable of type String
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private String password;

	/**
	 * groupList-Variable of type String
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private String groupList;

	/**
	 * personId-Variable of type String
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private String personId;

	/**
	 * personName-Variable of type String
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private String personName;

	/**
	 * Get username field of (AuthenticationRequest) table
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return username of type String
	 *
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * Set username field of (AuthenticationRequest) table
	 * 
	 * @author SenthilF
	 * @param username-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * Get password field of (AuthenticationRequest) table
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return password of type String
	 *
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * Set password field of (AuthenticationRequest) table
	 * 
	 * @author SenthilF
	 * @param password-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * Get group list field of (AuthenticationRequest) table
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return groupList of type String
	 *
	 */
	public String getGroupList() {
		return groupList;
	}

	/**
	 * Set group list field of (AuthenticationRequest) table
	 * 
	 * @author SenthilF
	 * @param groupList-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setGroupList(String groupList) {
		this.groupList = groupList;
	}

	/**
	 * Get person id field of (AuthenticationRequest) table
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return personId of type String
	 *
	 */
	public String getPersonId() {
		return personId;
	}

	/**
	 * Set person id field of (AuthenticationRequest) table
	 * 
	 * @author SenthilF
	 * @param personId-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setPersonId(String personId) {
		this.personId = personId;
	}

	/**
	 * Get person name field of (AuthenticationRequest) table
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return personName of type String
	 *
	 */
	public String getPersonName() {
		return personName;
	}

	/**
	 * Set person name field of (AuthenticationRequest) table
	 * 
	 * @author SenthilF
	 * @param personName-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setPersonName(String personName) {
		this.personName = personName;
	}

	/**
	 * Constructor
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	public AuthenticationRequest() {

	}

	/**
	 * Parameterized Constructor
	 * 
	 * @author SenthilF
	 * @param username-value of type String, password-value of type String,
	 *                       groupList-value of type String, personId-value of type
	 *                       String, personName-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public AuthenticationRequest(String username, String password, String groupList, String personId,
			String personName) {
		this.setUsername(username);
		this.setPassword(password);
		this.setGroupList(groupList);
		this.setPersonId(personId);
		this.setPersonName(personName);
	}

}
