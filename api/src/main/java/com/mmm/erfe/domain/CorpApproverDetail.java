package com.mmm.erfe.domain;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * @author Sowmya
 *
 */

@Entity
@Table(name = "t_corp_approver_detail")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class CorpApproverDetail implements Serializable {

	/**
	 * corpApproverId-Auto incremented primary key variable of type Integer
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Corp_Approver_Id", nullable = false)
	private int corpApproverId;

	/**
	 * orderSeq-Variable of type Integer
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Order_Seq", nullable = false)
	private int orderSeq;

	/**
	 * approverPin-Variable of type GlobalUser
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Approver_Pin", nullable = false)
	private GlobalUser approverPin;

	/**
	 * approverComments-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Approver_Comments", nullable = true)
	private String approverComments;

	/**
	 * approverAction-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Approver_Action", nullable = true)
	private String approverAction;

	/**
	 * actionDate-Variable of type Date
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Action_Date", nullable = true)
	private Date actionDate;

	/**
	 * createdPersonId-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name="created_person_id",nullable = false)
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
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name="modified_person_id",nullable = false)
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
	 * Constructor
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	public CorpApproverDetail() {
		super();
	}

	/**
	 * Get corp approver id field of t_corp_approver_detail(CorpApproverDetail)
	 * table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return corpApproverId of type Integer
	 *
	 */
	public int getCorpApproverId() {
		return corpApproverId;
	}

	/**
	 * Set corp approver id field of t_corp_approver_detail(CorpApproverDetail)
	 * table
	 * 
	 * @author Sowmya
	 * @param corpApproverId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setCorpApproverId(int corpApproverId) {
		this.corpApproverId = corpApproverId;
	}

	/**
	 * Get order seq field of t_corp_approver_detail(CorpApproverDetail) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return orderSeq of type Integer
	 *
	 */
	public int getOrderSeq() {
		return orderSeq;
	}

	/**
	 * Set order seq field of t_corp_approver_detail(CorpApproverDetail) table
	 * 
	 * @author Sowmya
	 * @param OrderSeq-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setOrderSeq(int OrderSeq) {
		this.orderSeq = OrderSeq;
	}

	/**
	 * Get approver pin field of t_corp_approver_detail(CorpApproverDetail) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return approverPin of type GlobalUser
	 *
	 */
	public GlobalUser getApproverPin() {
		return approverPin;
	}

	/**
	 * Set approver pin field of t_corp_approver_detail(CorpApproverDetail) table
	 * 
	 * @author Sowmya
	 * @param approverPin-value of type GlobalUser
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setApproverPin(GlobalUser approverPin) {
		this.approverPin = approverPin;
	}

	/**
	 * Get approver comments field of t_corp_approver_detail(CorpApproverDetail)
	 * table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return approverComments of type String
	 *
	 */
	public String getApproverComments() {
		return approverComments;
	}

	/**
	 * Set approver comments field of t_corp_approver_detail(CorpApproverDetail)
	 * table
	 * 
	 * @author Sowmya
	 * @param approverComments-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setApproverComments(String approverComments) {
		this.approverComments = approverComments;
	}

	/**
	 * Get approver action field of t_corp_approver_detail(CorpApproverDetail) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return approverAction of type String
	 *
	 */
	public String getApproverAction() {
		return approverAction;
	}

	/**
	 * Set approver action field of t_corp_approver_detail(CorpApproverDetail) table
	 * 
	 * @author Sowmya
	 * @param approverAction-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setApproverAction(String approverAction) {
		this.approverAction = approverAction;
	}

	/**
	 * Get action date field of t_corp_approver_detail(CorpApproverDetail) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return actionDate of type Date
	 *
	 */
	public Date getActionDate() {
		return actionDate;
	}

	/**
	 * Set action date field of t_corp_approver_detail(CorpApproverDetail) table
	 * 
	 * @author Sowmya
	 * @param actionDate-value of type Date
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setActionDate(Date actionDate) {
		this.actionDate = actionDate;
	}

	/**
	 * Get created date field of t_corp_approver_detail(CorpApproverDetail) table
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
	 * Set created date field of t_corp_approver_detail(CorpApproverDetail) table
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
	 * Get modified date field of t_corp_approver_detail(CorpApproverDetail) table
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
	 * Set modified date field of t_corp_approver_detail(CorpApproverDetail) table
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
	 * Get created person id field of t_corp_approver_detail(CorpApproverDetail)
	 * table
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
	 * Set created person id field of t_corp_approver_detail(CorpApproverDetail)
	 * table
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
	 * Get modified person id field of t_corp_approver_detail(CorpApproverDetail)
	 * table
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
	 * Set modified person id field of t_corp_approver_detail(CorpApproverDetail)
	 * table
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

}
