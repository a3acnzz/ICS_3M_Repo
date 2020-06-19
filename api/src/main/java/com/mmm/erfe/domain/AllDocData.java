package com.mmm.erfe.domain;

import java.io.Serializable;

/**
 * 
 * @author Senthil
 *
 */

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author Sowmya
 *
 */
@Entity
@Table(name = "V_AllDoc_Result")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class AllDocData implements Serializable {

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
	private int docId;

	/**
	 * psNumber-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Corp_PS_Req_Num", nullable = false)
	private String psNumber;

	/**
	 * approvedAmt-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Approved_Amount", nullable = false)
	private String approvedAmt;

	/**
	 * Get approved amt field of V_AllDoc_Result(AllDocData) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return approvedAmt of type String
	 *
	 */
	public String getApprovedAmt() {
		return approvedAmt;
	}

	/**
	 * Set approved amt field of V_AllDoc_Result(AllDocData) table
	 * 
	 * @author Sowmya
	 * @param approvedAmt-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setApprovedAmt(String approvedAmt) {
		this.approvedAmt = approvedAmt;
	}

	/**
	 * requestor-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "requestor", nullable = false)
	private String requestor;

	/**
	 * approver-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "approver", nullable = false)
	private String approver;

	/**
	 * origDate-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Created_Date", nullable = false)
	private String origDate;

	/**
	 * status-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "status", nullable = false)
	private String status;

	/**
	 * rfeNumber-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Rfe_num", nullable = false)
	private String rfeNumber;

//  @Column(name="Order_Seq",nullable = false)
//  private String seq;   

	/**
	 * Get rfe number field of V_AllDoc_Result(AllDocData) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return rfeNumber of type String
	 *
	 */
	public String getRfeNumber() {
		return rfeNumber;
	}

	/**
	 * Set rfe number field of V_AllDoc_Result(AllDocData) table
	 * 
	 * @author Sowmya
	 * @param rfeNumber-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setRfeNumber(String rfeNumber) {
		this.rfeNumber = rfeNumber;
	}

	/**
	 * Get doc id field of V_AllDoc_Result(AllDocData) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return docId of type Integer
	 *
	 */
	public int getDocId() {
		return docId;
	}

	/**
	 * Set doc id field of V_AllDoc_Result(AllDocData) table
	 * 
	 * @author Sowmya
	 * @param docId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setDocId(int docId) {
		this.docId = docId;
	}

	/**
	 * Get ps number field of V_AllDoc_Result(AllDocData) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return psNumber of type String
	 *
	 */
	public String getPsNumber() {
		return psNumber;
	}

	/**
	 * Set ps number field of V_AllDoc_Result(AllDocData) table
	 * 
	 * @author Sowmya
	 * @param psNumber-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setPsNumber(String psNumber) {
		this.psNumber = psNumber;
	}

	/**
	 * Get requestor field of V_AllDoc_Result(AllDocData) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return requestor of type String
	 *
	 */
	public String getRequestor() {
		return requestor;
	}

	/**
	 * Set requestor field of V_AllDoc_Result(AllDocData) table
	 * 
	 * @author Sowmya
	 * @param requestor-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setRequestor(String requestor) {
		this.requestor = requestor;
	}

	/**
	 * Get approver field of V_AllDoc_Result(AllDocData) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return approver of type String
	 *
	 */
	public String getApprover() {
		return approver;
	}

	/**
	 * Set approver field of V_AllDoc_Result(AllDocData) table
	 * 
	 * @author Sowmya
	 * @param approver-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setApprover(String approver) {
		this.approver = approver;
	}

	/**
	 * Get orig date field of V_AllDoc_Result(AllDocData) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return origDate of type String
	 *
	 */
	public String getOrigDate() {
		return origDate;
	}

	/**
	 * Set orig date field of V_AllDoc_Result(AllDocData) table
	 * 
	 * @author Sowmya
	 * @param origDate-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setOrigDate(String origDate) {
		this.origDate = origDate;
	}

	/**
	 * Get status field of V_AllDoc_Result(AllDocData) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return status of type String
	 *
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * Set status field of V_AllDoc_Result(AllDocData) table
	 * 
	 * @author Sowmya
	 * @param status-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setStatus(String status) {
		this.status = status;
	}

}
