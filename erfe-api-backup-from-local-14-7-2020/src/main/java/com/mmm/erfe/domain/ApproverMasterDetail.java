package com.mmm.erfe.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
@Table(name = "t_approver_master_detail")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class ApproverMasterDetail implements Serializable {

	/**
	 * approverId-Auto incremented primary key variable of type Integer
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Approver_ID", nullable = false)
	private Integer approverId;

	/**
	 * ApproverName-Variable of type String
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "ApproverName")
	private String ApproverName;

	/**
	 * personId-Variable of type String
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "PersonId")
	private String personId;

	/**
	 * approvalAmount-Variable of type float
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Approval_Amt")
	private float approvalAmount;

	/**
	 * Constructor
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	public ApproverMasterDetail() {
		super();
	}

	/**
	 * Get approver id field of t_approver_master_detail(ApproverMasterDetail) table
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return approverId of type Integer
	 *
	 */
	public int getApproverId() {
		return approverId;
	}

	/**
	 * Set approver id field of t_approver_master_detail(ApproverMasterDetail) table
	 * 
	 * @author Senthil
	 * @param approverId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setApproverId(int approverId) {
		this.approverId = approverId;
	}

	/**
	 * Get approver name field of t_approver_master_detail(ApproverMasterDetail)
	 * table
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return ApproverName of type String
	 *
	 */
	public String getApproverName() {
		return ApproverName;
	}

	/**
	 * Set approver name field of t_approver_master_detail(ApproverMasterDetail)
	 * table
	 * 
	 * @author Senthil
	 * @param approverName-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setApproverName(String approverName) {
		ApproverName = approverName;
	}

	/**
	 * Get person id field of t_approver_master_detail(ApproverMasterDetail) table
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return personId of type String
	 *
	 */
	public String getPersonId() {
		return personId;
	}

	/**
	 * Set person id field of t_approver_master_detail(ApproverMasterDetail) table
	 * 
	 * @author Senthil
	 * @param personId-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setPersonId(String personId) {
		this.personId = personId;
	}

	/**
	 * Get approval amount field of t_approver_master_detail(ApproverMasterDetail)
	 * table
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return approvalAmount of type float
	 *
	 */
	public float getApprovalAmount() {
		return approvalAmount;
	}

	/**
	 * Set approval amount field of t_approver_master_detail(ApproverMasterDetail)
	 * table
	 * 
	 * @author Senthil
	 * @param approvalAmount-value of type float
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setApprovalAmount(float approvalAmount) {
		this.approvalAmount = approvalAmount;
	}

}