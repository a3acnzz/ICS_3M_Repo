package com.mmm.erfe.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

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
@Table(name = "t_corp_ps_rfe")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class CorpPsRFE implements Serializable {

	/**
	 * docId-Auto incremented primary key variable of type Integer
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Doc_ID", updatable = false, nullable = false)
	private Integer docId;

	/**
	 * projectTitle-Variable of type String
	 * 
	 * @author Sowmya
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
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Description", nullable = false)
	private String projectDesc;

	/**
	 * comments-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Comments", nullable = false)
	private String comments;

	/**
	 * corpPSReqNum-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Corp_PS_Req_Num", nullable = false)
	private String corpPSReqNum;

	/**
	 * rfeNum-Variable of type Integer
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "RFE_Num", nullable = false)
	private Integer rfeNum;

	/**
	 * requesterPerson-Variable of type GlobalUser
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Requester_Pin", nullable = false)
	private GlobalUser requesterPerson;

	/**
	 * siteContactPin-Variable of type GlobalUser
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Site_Contact_Pin", nullable = false)
	private GlobalUser siteContactPin;

	/**
	 * projectCoordinator-Variable of type GlobalUser
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "Project_Coordinator_Id", nullable = false)
	private GlobalUser projectCoordinator;

	/**
	 * statusMaster-Variable of type StatusMaster
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "Status_ID", nullable = false)
	private StatusMaster statusMaster;

	/**
	 * bidMaster-Variable of type BidMaster
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "Bid_Type_ID", nullable = false)
	private BidMaster bidMaster;

	/**
	 * providerMaster-Variable of type ProviderMaster
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Provider_ID", nullable = false)
	private ProviderMaster providerMaster;

	/**
	 * startDate-Variable of type Date
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "start_date", nullable = false)
	private Date startDate;

	/**
	 * completionDate-Variable of type Date
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Completion_Date", nullable = false)
	private Date completionDate;

	/**
	 * expenses-Variable of type Float
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "additional_expenses", nullable = false)
	private BigDecimal expenses;

	/**
	 * fixedBidAmount-Variable of type Float
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Fixed_Bid_Amount", nullable = false)
	private BigDecimal fixedBidAmount;

	/**
	 * approvedAmount-Variable of type Float
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Approved_Amount", nullable = false)
	private BigDecimal approvedAmount;

	/**
	 * createdPersonId-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
//            @ManyToOne(fetch = FetchType.LAZY)
//            @JoinColumn(name = "Created_Person_Id", nullable = false)
	@Column(name = "Created_Person_Id")
	private String createdPersonId;

	/**
	 * createdDate-Variable of type Date
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Created_Date", nullable = false)
	private Date createdDate;

	/**
	 * modifiedPersonId-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
//            @ManyToOne(fetch = FetchType.LAZY)
//            @JoinColumn(name = "Modified_Person_Id", nullable = false)
	@Column(name = "Modified_Person_Id")
	private String modifiedPersonId;

	/**
	 * modifiedDate-Variable of type Date
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Modified_Date", nullable = false)
	private Date modifiedDate;

	/**
	 * renewedRfeNum-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "renew_rfe_num", nullable = false)
	private String renewedRfeNum;
	/*
	 * @OneToMany(fetch = FetchType.EAGER)
	 * 
	 * @Cascade({CascadeType.ALL})
	 * 
	 * @JoinColumn(name = "DOC_ID", nullable = false) private
	 * Set<CorpAccountingInformation> accountingInformation;
	 */

	/**
	 * accountingInformation-Variable of type List<CorpAccountingInformation>
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@OneToMany(fetch = FetchType.LAZY, orphanRemoval = true)
	@LazyCollection(LazyCollectionOption.FALSE)
	@Cascade({ CascadeType.ALL })
	@JoinColumn(name = "DOC_ID", nullable = false)
	private List<CorpAccountingInformation> accountingInformation;

	/**
	 * workerInformation-Variable of type List<CorpWorkerInformation>
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@OneToMany(fetch = FetchType.LAZY, orphanRemoval = true)
	@LazyCollection(LazyCollectionOption.FALSE)
	@Cascade({ CascadeType.ALL })
	@JoinColumn(name = "DOC_ID", nullable = false)
	private List<CorpWorkerInformation> workerInformation;

	/**
	 * approverInformation-Variable of type List<CorpApproverDetail>
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@OneToMany(fetch = FetchType.LAZY, orphanRemoval = true)
	@LazyCollection(LazyCollectionOption.FALSE)
	@Cascade({ CascadeType.ALL })
	@JoinColumn(name = "DOC_ID", nullable = false)
	private List<CorpApproverDetail> approverInformation;

	/**
	 * informationalCopyInformation-Variable of type List<CorpInformation>
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@OneToMany(fetch = FetchType.LAZY, orphanRemoval = true)
	@LazyCollection(LazyCollectionOption.FALSE)
	@Cascade({ CascadeType.ALL })
	@JoinColumn(name = "DOC_ID", nullable = false)
	private List<CorpInformation> informationalCopyInformation;

	/**
	 * activityLogInformation-Variable of type List<ActivityLog>
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@OneToMany(fetch = FetchType.LAZY)
	@LazyCollection(LazyCollectionOption.FALSE)
	@Cascade({ CascadeType.ALL })
	@JoinColumn(name = "DOC_ID", nullable = false)
	private List<ActivityLog> activityLogInformation;

	/**
	 * corpAttachments-Variable of type Set<CorpAttachment>
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Cascade({ CascadeType.ALL })
	@OneToMany(fetch = FetchType.EAGER)
	@JoinColumn(name = "DOC_ID", nullable = false)
	private Set<CorpAttachment> corpAttachments = new HashSet<CorpAttachment>();

	/**
	 * Get activity log information field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return activityLogInformation of type List<ActivityLog>
	 *
	 */
	public List<ActivityLog> getActivityLogInformation() {
		return activityLogInformation;
	}

	/**
	 * Set activity log information field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param activityLogInformation-value of type List<ActivityLog>
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setActivityLogInformation(List<ActivityLog> activityLogInformation) {
		this.activityLogInformation = activityLogInformation;
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
	public CorpPsRFE() {
	}

	/**
	 * Get doc id field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return docId of type Integer
	 *
	 */
	public Integer getDocId() {
		return docId;
	}

	/**
	 * Set doc id field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param docId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setDocId(Integer docId) {
		this.docId = docId;
	}

	/**
	 * Get project title field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return projectTitle of type String
	 *
	 */
	public String getProjectTitle() {
		return projectTitle;
	}

	/**
	 * Set project title field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param projectTitle-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;
	}

	/**
	 * Get corp PS req num field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return corpPSReqNum of type String
	 *
	 */
	public String getCorpPSReqNum() {
		return corpPSReqNum;
	}

	/**
	 * Set corp PS req num field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param corpPSReqNum-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setCorpPSReqNum(String corpPSReqNum) {
		this.corpPSReqNum = corpPSReqNum;
	}

	/**
	 * Get rfe num field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return rfeNum of type Integer
	 *
	 */
	public Integer getRfeNum() {
		return rfeNum;
	}

	/**
	 * Set rfe num field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param rfeNum-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setRfeNum(Integer rfeNum) {
		this.rfeNum = rfeNum;
	}

	/**
	 * Get requester person field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return requesterPerson of type GlobalUser
	 *
	 */
	public GlobalUser getRequesterPerson() {
		return requesterPerson;
	}

	/**
	 * Set requester person field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param requesterPerson-value of type GlobalUser
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setRequesterPerson(GlobalUser requesterPerson) {
		this.requesterPerson = requesterPerson;
	}

	/**
	 * Get site contact pin field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return siteContactPin of type GlobalUser
	 *
	 */
	public GlobalUser getSiteContactPin() {
		return siteContactPin;
	}

	/**
	 * Set site contact pin field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param siteContactPin-value of type GlobalUser
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setSiteContactPin(GlobalUser siteContactPin) {
		this.siteContactPin = siteContactPin;
	}

	/**
	 * Get project coordinator field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return projectCoordinator of type GlobalUser
	 *
	 */
	public GlobalUser getProjectCoordinator() {
		return projectCoordinator;
	}

	/**
	 * Set project coordinator field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param projectCoordinator-value of type GlobalUser
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setProjectCoordinator(GlobalUser projectCoordinator) {
		this.projectCoordinator = projectCoordinator;
	}

	/**
	 * Get status master field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return statusMaster of type StatusMaster
	 *
	 */
	public StatusMaster getStatusMaster() {
		return statusMaster;
	}

	/**
	 * Set status master field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param statusMaster-value of type StatusMaster
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setStatusMaster(StatusMaster statusMaster) {
		this.statusMaster = statusMaster;
	}

	/**
	 * Get bid master field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return bidMaster of type BidMaster
	 *
	 */
	public BidMaster getBidMaster() {
		return bidMaster;
	}

	/**
	 * Set bid master field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param bidMaster-value of type BidMaster
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setBidMaster(BidMaster bidMaster) {
		this.bidMaster = bidMaster;
	}

	/**
	 * Get provider master field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return providerMaster of type ProviderMaster
	 *
	 */
	public ProviderMaster getProviderMaster() {
		return providerMaster;
	}

	/**
	 * Set provider master field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param providerMaster-value of type ProviderMaster
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setProviderMaster(ProviderMaster providerMaster) {
		this.providerMaster = providerMaster;
	}

	/**
	 * Get start date field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return startDate of type Date
	 *
	 */
	public Date getStartDate() {
		return startDate;
	}

	/**
	 * Set start date field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param startDate-value of type Date
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	/**
	 * Get completion date field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return completionDate of type Date
	 *
	 */
	public Date getCompletionDate() {
		return completionDate;
	}

	/**
	 * Set completion date field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param completionDate-value of type Date
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setCompletionDate(Date completionDate) {
		this.completionDate = completionDate;
	}

	/**
	 * Get expenses field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return expenses of type Float
	 *
	 */
	public BigDecimal getExpenses() {
		return expenses;
	}

	/**
	 * Set expenses field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param expenses-value of type Float
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setExpenses(BigDecimal expenses) {
		this.expenses = expenses;
	}

	/**
	 * Get approved amount field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return approvedAmount of type Float
	 *
	 */
	public BigDecimal getApprovedAmount() {
		return approvedAmount;
	}

	/**
	 * Set approved amount field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param approvedAmount-value of type Float
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setApprovedAmount(BigDecimal approvedAmount) {
		this.approvedAmount = approvedAmount;
	}

	/**
	 * Get created person id field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return createdPersonId of type String
	 *
	 */
	public String getCreatedPersonId() {
		return createdPersonId;
	}

	/**
	 * Set created person id field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param createdPersonId-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setCreatedPersonId(String createdPersonId) {
		this.createdPersonId = createdPersonId;
	}

	/**
	 * Get created date field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return createdDate of type Date
	 *
	 */
	public Date getCreatedDate() {
		return createdDate;
	}

	/**
	 * Set created date field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param createdDate-value of type Date
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	/**
	 * Get modified person id field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return modifiedPersonId of type String
	 *
	 */
	public String getModifiedPersonId() {
		return modifiedPersonId;
	}

	/**
	 * Set modified person id field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param modifiedPersonId-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setModifiedPersonId(String modifiedPersonId) {
		this.modifiedPersonId = modifiedPersonId;
	}

	/**
	 * Get modified date field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return modifiedDate of type Date
	 *
	 */
	public Date getModifiedDate() {
		return modifiedDate;
	}

	/**
	 * Set modified date field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param modifiedDate-value of type Date
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	/**
	 * Get accounting information field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return accountingInformation of type List<CorpAccountingInformation>
	 *
	 */
	public List<CorpAccountingInformation> getAccountingInformation() {
		return accountingInformation;
	}

	/**
	 * Set accounting information field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param accountingInformation-value of type List<CorpAccountingInformation>
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setAccountingInformation(List<CorpAccountingInformation> accountingInformation) {
		this.accountingInformation = accountingInformation;
	}

	/**
	 * Get worker information field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return workerInformation of type List<CorpWorkerInformation>
	 *
	 */
	public List<CorpWorkerInformation> getWorkerInformation() {
		return workerInformation;
	}

	/**
	 * Set worker information field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param workerInformation-value of type List<CorpWorkerInformation>
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setWorkerInformation(List<CorpWorkerInformation> workerInformation) {
		this.workerInformation = workerInformation;
	}

	/**
	 * Get approver information field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return approverInformation of type List<CorpApproverDetail>
	 *
	 */
	public List<CorpApproverDetail> getApproverInformation() {
		return approverInformation;
	}

	/**
	 * Set approver information field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param approverInformation-value of type List<CorpApproverDetail>
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setApproverInformation(List<CorpApproverDetail> approverInformation) {
		this.approverInformation = approverInformation;
	}

	/**
	 * Get informational copy information field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return informationalCopyInformation of type List<CorpInformation>
	 *
	 */
	public List<CorpInformation> getInformationalCopyInformation() {
		return informationalCopyInformation;
	}

	/**
	 * Set informational copy information field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param informationalCopyInformation-value of type List<CorpInformation>
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setInformationalCopyInformation(List<CorpInformation> informationalCopyInformation) {
		this.informationalCopyInformation = informationalCopyInformation;
	}

	/**
	 * Get project desc field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return projectDesc of type String
	 *
	 */
	public String getProjectDesc() {
		return projectDesc;
	}

	/**
	 * Set project desc field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param projectDesc-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setProjectDesc(String projectDesc) {
		this.projectDesc = projectDesc;
	}

	/**
	 * Get comments field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return comments of type String
	 *
	 */
	public String getComments() {
		return comments;
	}

	/**
	 * Set comments field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param comments-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setComments(String comments) {
		this.comments = comments;
	}

	/**
	 * Get fixed bid amount field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return fixedBidAmount of type Float
	 *
	 */
	public BigDecimal getFixedBidAmount() {
		return fixedBidAmount;
	}

	/**
	 * Set fixed bid amount field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param fixedBidAmount-value of type Float
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setFixedBidAmount(BigDecimal fixedBidAmount) {
		this.fixedBidAmount = fixedBidAmount;
	}

	/**
	 * Get corp attachments field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return corpAttachments of type Set<CorpAttachment>
	 *
	 */
	public Set<CorpAttachment> getCorpAttachments() {
		return corpAttachments;
	}

	/**
	 * Set corp attachments field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param corpAttachments-value of type Set<CorpAttachment>
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setCorpAttachments(Set<CorpAttachment> corpAttachments) {
		this.corpAttachments = corpAttachments;
	}

	/**
	 * Get renewed rfe num field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return renewedRfeNum of type String
	 *
	 */
	public String getRenewedRfeNum() {
		return renewedRfeNum;
	}

	/**
	 * Set renewed rfe num field of t_corp_ps_rfe(CorpPsRFE) table
	 * 
	 * @author Sowmya
	 * @param renewedRfeNum-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setRenewedRfeNum(String renewedRfeNum) {
		this.renewedRfeNum = renewedRfeNum;
	}

}
