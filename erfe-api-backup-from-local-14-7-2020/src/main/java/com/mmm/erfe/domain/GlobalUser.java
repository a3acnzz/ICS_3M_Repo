package com.mmm.erfe.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * 
 * @author Sowmya
 *
 */

/**
 * @author Sowmya
 *
 */
@Entity
@Table(name = "t_person_master_detail")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class GlobalUser {

	/**
	 * personId-Auto incremented primary key variable of type Integer
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "person_id", nullable = false)
	private String personId;

	/**
	 * userPin-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "user_pin", nullable = false)
	private String userPin;

	/**
	 * personFirstName-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Person_First_Name")
	private String personFirstName;

	/**
	 * personLastName-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Person_Last_Name")
	private String personLastName;

	/**
	 * personMiddleName-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Person_Middle_Name")
	private String personMiddleName;

	/**
	 * personPhoneNum-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Person_Phone_Number")
	private String personPhoneNum;

	/**
	 * isActive-Variable of type boolean
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "isActive", nullable = false, columnDefinition = "true")
	private String isActive;

	/**
	 * deptCode-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "dept_Code", nullable = false)
	private String deptCode;

	/**
	 * deptName-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "dept_Name", nullable = false)
	private String deptName;
	/**
	 * emailId of type String
	 * 
	 * @author senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Email", nullable = false)
	private String emailId;

	/**
	 * Parameterized Constructor
	 * 
	 * @author Sowmya
	 * @param personId-value of type String, userPin-value of type String,
	 *                       personFirstName-value of type String,
	 *                       personLastName-value of type String,
	 *                       personMiddleName-value of type String,
	 *                       personPhoneNum-value of type String, isActive-value of
	 *                       type boolean, deptCode-value of type String,
	 *                       deptName-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public GlobalUser(String personId, String userPin, String personFirstName, String personLastName,
			String personMiddleName, String personPhoneNum, String isActive, String deptCode, String deptName
			) {
		super();
		this.personId = personId;
		this.userPin = userPin;
		this.personFirstName = personFirstName;
		this.personLastName = personLastName;
		this.personMiddleName = personMiddleName;
		this.personPhoneNum = personPhoneNum;
		this.isActive = isActive;
		this.deptCode = deptCode;
		this.deptName = deptName;
		
	}

	/**
	 * Get dept code field of t_person_master_detail(GlobalUser) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return deptCode of type String
	 *
	 */
	public String getDeptCode() {
		return deptCode;
	}

	/**
	 * Set dept code field of t_person_master_detail(GlobalUser) table
	 * 
	 * @author Sowmya
	 * @param deptCode-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setDeptCode(String deptCode) {
		this.deptCode = deptCode;
	}

	/**
	 * Get dept name field of t_person_master_detail(GlobalUser) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return deptName of type String
	 *
	 */
	public String getDeptName() {
		return deptName;
	}

	/**
	 * Set dept name field of t_person_master_detail(GlobalUser) table
	 * 
	 * @author Sowmya
	 * @param deptName-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	/**
	 * Constructor
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	public GlobalUser() {
	}

	/**
	 * Get person id field of t_person_master_detail(GlobalUser) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return personId of type String
	 *
	 */
	public String getPersonId() {
		return personId;
	}

	/**
	 * Set person id field of t_person_master_detail(GlobalUser) table
	 * 
	 * @author Sowmya
	 * @param personId-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setPersonId(String personId) {
		this.personId = personId;
	}

	/**
	 * Get user pin field of t_person_master_detail(GlobalUser) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return userPin of type String
	 *
	 */
	public String getUserPin() {
		return userPin;
	}

	/**
	 * Set user pin field of t_person_master_detail(GlobalUser) table
	 * 
	 * @author Sowmya
	 * @param userPin-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setUserPin(String userPin) {
		this.userPin = userPin;
	}

	/**
	 * Get person first name field of t_person_master_detail(GlobalUser) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return personFirstName of type String
	 *
	 */
	public String getPersonFirstName() {
		return personFirstName;
	}

	/**
	 * Set person first name field of t_person_master_detail(GlobalUser) table
	 * 
	 * @author Sowmya
	 * @param personFirstName-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setPersonFirstName(String personFirstName) {
		this.personFirstName = personFirstName;
	}

	/**
	 * Get person last name field of t_person_master_detail(GlobalUser) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return personLastName of type String
	 *
	 */
	public String getPersonLastName() {
		return personLastName;
	}

	/**
	 * Set person last name field of t_person_master_detail(GlobalUser) table
	 * 
	 * @author Sowmya
	 * @param personLastName-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setPersonLastName(String personLastName) {
		this.personLastName = personLastName;
	}

	/**
	 * Get person middle name field of t_person_master_detail(GlobalUser) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return personMiddleName of type String
	 *
	 */
	public String getPersonMiddleName() {
		return personMiddleName;
	}

	/**
	 * Set person middle name field of t_person_master_detail(GlobalUser) table
	 * 
	 * @author Sowmya
	 * @param personMiddleName-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setPersonMiddleName(String personMiddleName) {
		this.personMiddleName = personMiddleName;
	}

	/**
	 * Get person phone num field of t_person_master_detail(GlobalUser) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return personPhoneNum of type String
	 *
	 */
	public String getPersonPhoneNum() {
		return personPhoneNum;
	}

	/**
	 * Set person phone num field of t_person_master_detail(GlobalUser) table
	 * 
	 * @author Sowmya
	 * @param personPhoneNum-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setPersonPhoneNum(String personPhoneNum) {
		this.personPhoneNum = personPhoneNum;
	}



	

	/**
	 * Get isActive of t_person_master_detail(GlobalUser) table
	 * 
	 * @author senthil
	 * @param void
	 * @throws Nothing
	 * @return isActive of type boolean
	 *
	 */	public String getIsActive() {
			return isActive;
		}
	

	/**
	 * Set active field of t_person_master_detail(GlobalUser) table
	 * 
	 * @author senthil
	 * @param active-value of type boolean
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setIsActive(String isActive) {
		this.isActive = isActive;
	}

	/**
	 * Set email of t_person_master_detail(GlobalUser) table
	 * 
	 * @author senthil
	 * @param email of type string
	 * @throws Nothing
	 * @return void
	 *
	 */
	public String getEmailId() {
		return emailId;
	}

	/**
	 * Get person email id field of t_person_master_detail(GlobalUser) table
	 * 
	 * @author senthil
	 * @param void
	 * @throws Nothing
	 * @return emailId of type String
	 *
	 */
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

}
