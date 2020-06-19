package com.mmm.erfe.domain;

import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
@Entity
@Table(name = "V_Search_Result_User")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class UserSearchResult {

	/**
	 * docId-Auto incremented primary key variable of type Integer
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", updatable = false, nullable = false)
	private int docId;

	/**
	 * contactName-Variable of type String
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "contactName", nullable = false)
	private String contactName;

	/**
	 * siteContactPin-Variable of type String
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Site_Contact_Pin", nullable = false)
	private String siteContactPin;

	/**
	 * projectCoordinatorId-Variable of type String
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Project_Coordinator_Id", nullable = false)
	private String projectCoordinatorId;

	/**
	 * informationPersonId-Variable of type String
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Information_Person_Id", nullable = false)
	private String informationPersonId;

	/**
	 * CorpPSReqNum-Variable of type String
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Corp_PS_Req_Num", nullable = false)
	private String CorpPSReqNum;

	/**
	 * approvedAmount-Variable of type Float
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Approved_Amount", nullable = false)
	private Float approvedAmount;

	/**
	 * currentApprover-Variable of type String
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Currentapprover")
	private String currentApprover;

	/**
	 * rfeNum-Variable of type Integer
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "RFE_Num", nullable = false)
	private Integer rfeNum;

	/**
	 * supplier-Variable of type String
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "supplier", nullable = false)
	private String supplier;

	/**
	 * projectTitle-Variable of type String
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "project_title", nullable = false)
	private String projectTitle;

	/**
	 * projectDesc-Variable of type String
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Description", nullable = false)
	private String projectDesc;

	/**
	 * costCenter-Variable of type String
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "costCenter", nullable = false)
	private String costCenter;

	/**
	 * wbs-Variable of type String
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "WBS", nullable = false)
	private String wbs;

	/**
	 * status-Variable of type String
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "status", nullable = false)
	private String status;

	/**
	 * startDate-Variable of type Date
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Start_Date", nullable = false)
	private Date startDate;

	/**
	 * completionDate-Variable of type Date
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Completion_Date", nullable = false)
	private Date completionDate;

	/**
	 * origDate-Variable of type Date
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "origDate", nullable = false)
	private Date origDate;

	/**
	 * createdPerson-Variable of type String
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Created_Person_Id", nullable = false)
	private String createdPerson;

	/**
	 * approverId-Variable of type String
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Approver_Pin", nullable = false)
	private String approverId;

	/**
	 * Get doc id field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return docId of type Integer
	 *
	 */
	@Column(name = "requestorName", nullable = false)
	private String requestorName;
	@Column(name = "project_Coordinator", nullable = false)
	private String projectCoordinator;
	@Column(name = "ApproverName", nullable = false)
	private String approverName;
	@Column(name = "infoname", nullable = false)
	private String infoName;
	public int getDocId() {
		return docId;
	}

	/**
	 * Set doc id field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param docId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setDocId(int docId) {
		this.docId = docId;
	}

	/**
	 * Get contact name field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return contactName of type String
	 *
	 */
	public String getContactName() {
		return contactName;
	}

	/**
	 * Set contact name field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param contactName-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setContactName(String contactName) {
		this.contactName = contactName;
	}

	/**
	 * Get site contact pin field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return siteContactPin of type String
	 *
	 */
	public String getSiteContactPin() {
		return siteContactPin;
	}

	/**
	 * Set site contact pin field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param siteContactPin-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setSiteContactPin(String siteContactPin) {
		this.siteContactPin = siteContactPin;
	}

	/**
	 * Get project coordinator id field of V_Search_Result_User(UserSearchResult)
	 * table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return projectCoordinatorId of type String
	 *
	 */
	public String getProjectCoordinatorId() {
		return projectCoordinatorId;
	}

	/**
	 * Set project coordinator id field of V_Search_Result_User(UserSearchResult)
	 * table
	 * 
	 * @author Rajkumar
	 * @param projectCoordinatorId-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setProjectCoordinatorId(String projectCoordinatorId) {
		this.projectCoordinatorId = projectCoordinatorId;
	}

	/**
	 * Get information person id field of V_Search_Result_User(UserSearchResult)
	 * table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return informationPersonId of type String
	 *
	 */
	public String getInformationPersonId() {
		return informationPersonId;
	}

	/**
	 * Set information person id field of V_Search_Result_User(UserSearchResult)
	 * table
	 * 
	 * @author Rajkumar
	 * @param informationPersonId-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setInformationPersonId(String informationPersonId) {
		this.informationPersonId = informationPersonId;
	}

	/**
	 * Get Corp PS req num field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return CorpPSReqNum of type String
	 *
	 */
	public String getCorpPSReqNum() {
		return CorpPSReqNum;
	}

	/**
	 * Set Corp PS req num field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param corpPSReqNum-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setCorpPSReqNum(String corpPSReqNum) {
		CorpPSReqNum = corpPSReqNum;
	}

	/**
	 * Get approved amount field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return approvedAmount of type Float
	 *
	 */
	public Float getApprovedAmount() {
		return approvedAmount;
	}

	/**
	 * Set approved amount field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param approvedAmount-value of type Float
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setApprovedAmount(Float approvedAmount) {
		this.approvedAmount = approvedAmount;
	}

	/**
	 * Get current approver field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return currentApprover of type String
	 *
	 */
	public String getCurrentApprover() {
		return currentApprover;
	}

	/**
	 * Set current approver field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param currentApprover-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setCurrentApprover(String currentApprover) {
		this.currentApprover = currentApprover;
	}

	/**
	 * Get rfe num field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return rfeNum of type Integer
	 *
	 */
	public Integer getRfeNum() {
		return rfeNum;
	}

	/**
	 * Set rfe num field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param rfeNum-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setRfeNum(Integer rfeNum) {
		this.rfeNum = rfeNum;
	}

	/**
	 * Get supplier field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return supplier of type String
	 *
	 */
	public String getSupplier() {
		return supplier;
	}

	/**
	 * Set supplier field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param supplier-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}

	/**
	 * Get project title field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return projectTitle of type String
	 *
	 */
	public String getProjectTitle() {
		return projectTitle;
	}

	/**
	 * Set project title field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param projectTitle-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;
	}

	/**
	 * Get project desc field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return projectDesc of type String
	 *
	 */
	public String getProjectDesc() {
		return projectDesc;
	}

	/**
	 * Set project desc field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param projectDesc-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setProjectDesc(String projectDesc) {
		this.projectDesc = projectDesc;
	}

	/**
	 * Get cost center field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return costCenter of type String
	 *
	 */
	public String getCostCenter() {
		return costCenter;
	}

	/**
	 * Set cost center field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param costCenter-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setCostCenter(String costCenter) {
		this.costCenter = costCenter;
	}

	/**
	 * Get wbs field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return wbs of type String
	 *
	 */
	public String getWbs() {
		return wbs;
	}

	/**
	 * Set wbs field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param wbs-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setWbs(String wbs) {
		this.wbs = wbs;
	}

	/**
	 * Get status field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return status of type String
	 *
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * Set status field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param status-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * Get start date field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return startDate of type Date
	 *
	 */
	public Date getStartDate() {
		return startDate;
	}

	/**
	 * Set start date field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param startDate-value of type Date
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	/**
	 * Get completion date field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return completionDate of type Date
	 *
	 */
	public Date getCompletionDate() {
		return completionDate;
	}

	/**
	 * Set completion date field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param completionDate-value of type Date
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setCompletionDate(Date completionDate) {
		this.completionDate = completionDate;
	}

	/**
	 * Get orig date field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return origDate of type Date
	 *
	 */
	public Date getOrigDate() {
		return origDate;
	}

	/**
	 * Set orig date field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param origDate-value of type Date
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setOrigDate(Date origDate) {
		this.origDate = origDate;
	}

	/**
	 * Get created person field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return createdPerson of type String
	 *
	 */
	public String getCreatedPerson() {
		return createdPerson;
	}

	/**
	 * Set created person field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param createdPerson-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setCreatedPerson(String createdPerson) {
		this.createdPerson = createdPerson;
	}

	/**
	 * Get approver id field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return approverId of type String
	 *
	 */
	public String getApproverId() {
		return approverId;
	}

	/**
	 * Set approver id field of V_Search_Result_User(UserSearchResult) table
	 * 
	 * @author Rajkumar
	 * @param approverId-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setApproverId(String approverId) {
		this.approverId = approverId;
	}

	public String getRequestorName() {
		return requestorName;
	}

	public void setRequestorName(String requestorName) {
		this.requestorName = requestorName;
	}

	public String getProjectCoordinator() {
		return projectCoordinator;
	}

	public void setProjectCoordinator(String projectCoordinator) {
		this.projectCoordinator = projectCoordinator;
	}

	public String getApproverName() {
		return approverName;
	}

	public void setApproverName(String approverName) {
		this.approverName = approverName;
	}

	public String getInfoName() {
		return infoName;
	}

	public void setInfoName(String infoName) {
		this.infoName = infoName;
	}
	

}
