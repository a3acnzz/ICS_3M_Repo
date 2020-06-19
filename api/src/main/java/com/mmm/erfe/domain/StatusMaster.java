package com.mmm.erfe.domain;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * @author Rajkumar
 *
 */
@Entity
@Table(name = "t_status_master_detail")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class StatusMaster implements Serializable {

	/**
	 * statusId-Auto incremented primary key variable of type Integer
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "status_id", nullable = false, updatable = false)
	private Integer statusId;

	/**
	 * statusName-Variable of type String
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "status_name", nullable = false)
	private String statusName;

	/**
	 * Constructor
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	public StatusMaster() {

	}

	/**
	 * Parameterized Constructor
	 * 
	 * @author Rajkumar
	 * @param statusName-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public StatusMaster(String statusName) {
		this.statusName = statusName;
	}

	/**
	 * Get status id field of t_status_master_detail(StatusMaster) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return statusId of type Integer
	 *
	 */
	public Integer getStatusId() {
		return statusId;
	}

	/**
	 * Set status id field of t_status_master_detail(StatusMaster) table
	 * 
	 * @author Rajkumar
	 * @param statusId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setStatusId(Integer statusId) {
		this.statusId = statusId;
	}

	/**
	 * Get status name field of t_status_master_detail(StatusMaster) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return statusName of type String
	 *
	 */
	public String getStatusName() {
		return statusName;
	}

	/**
	 * Set status name field of t_status_master_detail(StatusMaster) table
	 * 
	 * @author Rajkumar
	 * @param statusName-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}
}
