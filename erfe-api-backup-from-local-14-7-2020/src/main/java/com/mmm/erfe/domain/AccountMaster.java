package com.mmm.erfe.domain;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
@Entity
@Table(name = "t_account_master_detail")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class AccountMaster implements Serializable {

	/**
	 * accountId-Auto incremented primary key variable of type Integer
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "account_id", nullable = false)
	private Integer accountId;

	/**
	 * accountDesc-Variable of type String
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "account_description")
	private String accountDesc;

	/**
	 * limit-Variable of type Integer
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "limit")
	private Integer limit;

	/**
	 * isActive-Variable of type boolean
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "isActive", nullable = false, columnDefinition = "false")
	private String isActive;

	/**
	 * Parameterized Constructor
	 * 
	 * @author Senthil
	 * @param accountDesc-value of type String, limit-value of type Integer,
	 *                          isActive-value of type boolean
	 * @throws Nothing
	 * @return void
	 *
	 */
	public AccountMaster(String accountDesc, Integer limit, String isActive) {
		this.accountDesc = accountDesc;
		this.limit = limit;
		this.isActive = isActive;
	}

	/**
	 * Constructor
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	public AccountMaster() {

	}

	/**
	 * Get account id field of t_account_master_detail(AccountMaster) table
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return accountId of type Integer
	 *
	 */
	public Integer getAccountId() {
		return accountId;
	}

	/**
	 * Set account id field of t_account_master_detail(AccountMaster) table
	 * 
	 * @author Senthil
	 * @param accountId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
	}

	/**
	 * Get account desc field of t_account_master_detail(AccountMaster) table
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return accountDesc of type String
	 *
	 */
	public String getAccountDesc() {
		return accountDesc;
	}

	/**
	 * Set account desc field of t_account_master_detail(AccountMaster) table
	 * 
	 * @author Senthil
	 * @param accountDesc-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setAccountDesc(String accountDesc) {
		this.accountDesc = accountDesc;
	}

	/**
	 * Get limit field of t_account_master_detail(AccountMaster) table
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return limit of type Integer
	 *
	 */
	public Integer getLimit() {
		return limit;
	}

	/**
	 * Set limit field of t_account_master_detail(AccountMaster) table
	 * 
	 * @author Senthil
	 * @param limit-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	

	

	/**
	 * Get isActive of t_person_master_detail(GlobalUser) table
	 * 
	 * @author senthil
	 * @param void
	 * @throws Nothing
	 * @return isActive of type boolean
	 *
	 */
	public String getIsActive() {
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
}
