package com.mmm.erfe.domain;

import java.io.Serializable;
import java.util.Date;

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
 * @author SenthilF
 *
 */
@Entity
@Table(name = "V_Dashboard_Result")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class ApproverDashboardResult implements Serializable {

	/**
	 * id-Auto incremented primary key variable of type Integer
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", updatable = false, nullable = false)
	private int id;

	/**
	 * docId-Variable of type Integer
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Doc_id", updatable = false, nullable = false)
	private int docId;

	/**
	 * corpPsNumber-Variable of type String
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Corp_PS_Req_Num", nullable = false)
	private String corpPsNumber;

	/**
	 * rfeNum-Variable of type String
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "RFE_Num", nullable = false)
	private String rfeNum;

	/**
	 * approverPin-Variable of type String
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Approver_Pin", nullable = false)
	private String approverPin;

	/**
	 * approverAction-Variable of type String
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Approver_Action", nullable = true)
	private String approverAction;

	/**
	 * requestorName-Variable of type String
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "requestor", nullable = false)
	private String requestorName;

	/**
	 * ApproverName-Variable of type String
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "approver", nullable = false)
	private String ApproverName;

	/**
	 * createdDate-Variable of type Date
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Created_Date", nullable = false)
	private Date createdDate;

	/**
	 * status-Variable of type String
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "status", nullable = false)
	private String status;
	/**
	 * projectTitle-Variable of type String
	 * 
	 * @author senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "project_title", nullable = false)
	private String projectTitle; 

	/**
	 * Constructor
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	
	public ApproverDashboardResult() {
		super();
	}

	/**
	 * Get id field of V_Dashboard_Result(ApproverDashboardResult) table
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return id of type Integer
	 *
	 */
	public int getId() {
		return id;
	}

	/**
	 * Set id field of V_Dashboard_Result(ApproverDashboardResult) table
	 * 
	 * @author SenthilF
	 * @param id-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * Get doc id field of V_Dashboard_Result(ApproverDashboardResult) table
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return docId of type Integer
	 *
	 */
	public int getDocId() {
		return docId;
	}

	/**
	 * Set doc id field of V_Dashboard_Result(ApproverDashboardResult) table
	 * 
	 * @author SenthilF
	 * @param docId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setDocId(int docId) {
		this.docId = docId;
	}

	/**
	 * Get corp ps number field of V_Dashboard_Result(ApproverDashboardResult) table
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return corpPsNumber of type String
	 *
	 */
	public String getCorpPsNumber() {
		return corpPsNumber;
	}

	/**
	 * Set corp ps number field of V_Dashboard_Result(ApproverDashboardResult) table
	 * 
	 * @author SenthilF
	 * @param corpPsNumber-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setCorpPsNumber(String corpPsNumber) {
		this.corpPsNumber = corpPsNumber;
	}

	/**
	 * Get rfe num field of V_Dashboard_Result(ApproverDashboardResult) table
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return rfeNum of type String
	 *
	 */
	public String getRfeNum() {
		return rfeNum;
	}

	/**
	 * Set rfe num field of V_Dashboard_Result(ApproverDashboardResult) table
	 * 
	 * @author SenthilF
	 * @param rfeNum-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setRfeNum(String rfeNum) {
		this.rfeNum = rfeNum;
	}

	/**
	 * Get approver pin field of V_Dashboard_Result(ApproverDashboardResult) table
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return approverPin of type String
	 *
	 */
	public String getApproverPin() {
		return approverPin;
	}

	/**
	 * Set approver pin field of V_Dashboard_Result(ApproverDashboardResult) table
	 * 
	 * @author SenthilF
	 * @param approverPin-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setApproverPin(String approverPin) {
		this.approverPin = approverPin;
	}

	/**
	 * Get approver action field of V_Dashboard_Result(ApproverDashboardResult)
	 * table
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return approverAction of type String
	 *
	 */
	public String getApproverAction() {
		return approverAction;
	}

	/**
	 * Set approver action field of V_Dashboard_Result(ApproverDashboardResult)
	 * table
	 * 
	 * @author SenthilF
	 * @param approverAction-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setApproverAction(String approverAction) {
		this.approverAction = approverAction;
	}

	/**
	 * Get requestor name field of V_Dashboard_Result(ApproverDashboardResult) table
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return requestorName of type String
	 *
	 */
	public String getRequestorName() {
		return requestorName;
	}

	/**
	 * Set requestor name field of V_Dashboard_Result(ApproverDashboardResult) table
	 * 
	 * @author SenthilF
	 * @param requestorName-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setRequestorName(String requestorName) {
		this.requestorName = requestorName;
	}

	/**
	 * Get approver name field of V_Dashboard_Result(ApproverDashboardResult) table
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return ApproverName of type String
	 *
	 */
	public String getApproverName() {
		return ApproverName;
	}

	/**
	 * Set approver name field of V_Dashboard_Result(ApproverDashboardResult) table
	 * 
	 * @author SenthilF
	 * @param approverName-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setApproverName(String approverName) {
		ApproverName = approverName;
	}

	/**
	 * Get created date field of V_Dashboard_Result(ApproverDashboardResult) table
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return createdDate of type Date
	 *
	 */
	public Date getCreatedDate() {
		return createdDate;
	}

	/**
	 * Set created date field of V_Dashboard_Result(ApproverDashboardResult) table
	 * 
	 * @author SenthilF
	 * @param createdDate-value of type Date
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	/**
	 * Get status field of V_Dashboard_Result(ApproverDashboardResult) table
	 * 
	 * @author SenthilF
	 * @param void
	 * @throws Nothing
	 * @return status of type String
	 *
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * Set status field of V_Dashboard_Result(ApproverDashboardResult) table
	 * 
	 * @author SenthilF
	 * @param status-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	public String getProjectTitle() {
		return projectTitle;
	}

	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;
	}

}
