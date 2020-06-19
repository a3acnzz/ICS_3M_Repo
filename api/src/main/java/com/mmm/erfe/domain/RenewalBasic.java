package com.mmm.erfe.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

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
@Table(name = "t_Renewals_basic")
public class RenewalBasic implements Serializable {

	/**
	 * renewalId-Auto incremented primary key variable of type Integer
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "renewal_id", nullable = false)
	private Integer renewalId;

	/**
	 * rfeNo-Variable of type Integer
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "rfa_nbr")
	private Integer rfeNo;

	/**
	 * projectTitle-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "project_Title")
	private String projectTitle;

	/**
	 * description-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "project_desc")
	private String description;

	/**
	 * startDate-Variable of type Date
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "start_Date")
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
	@Column(name = "completion_date")
	private Date completionDate;

	/**
	 * supplierNumber-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "supplier_nbr")
	private String supplierNumber;

	/**
	 * supplierName-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "supplier_Name")
	private String supplierName;

	/**
	 * hourly-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "hourly_bid")
	private String hourly;

	/**
	 * fixed-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "fixedbid")
	private String fixed;

	/**
	 * additionalExp-Variable of type BigDecimal
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "additional_Expense")
	private BigDecimal additionalExp;

	/**
	 * approvalAmt-Variable of type BigDecimal
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Approved_Amount")
	private BigDecimal approvalAmt;

	/**
	 * Get renewal id field of t_Renewals_basic(RenewalBasic) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return renewalId of type Integer
	 *
	 */
	public Integer getRenewalId() {
		return renewalId;
	}

	/**
	 * Set renewal id field of t_Renewals_basic(RenewalBasic) table
	 * 
	 * @author Sowmya
	 * @param renewalId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setRenewalId(Integer renewalId) {
		this.renewalId = renewalId;
	}

	/**
	 * Get rfe no field of t_Renewals_basic(RenewalBasic) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return rfeNo of type Integer
	 *
	 */
	public Integer getRfeNo() {
		return rfeNo;
	}

	/**
	 * Set rfe no field of t_Renewals_basic(RenewalBasic) table
	 * 
	 * @author Sowmya
	 * @param rfeNo-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setRfeNo(Integer rfeNo) {
		this.rfeNo = rfeNo;
	}

	/**
	 * Get project title field of t_Renewals_basic(RenewalBasic) table
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
	 * Set project title field of t_Renewals_basic(RenewalBasic) table
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
	 * Get description field of t_Renewals_basic(RenewalBasic) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return description of type String
	 *
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * Set description field of t_Renewals_basic(RenewalBasic) table
	 * 
	 * @author Sowmya
	 * @param description-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * Get start date field of t_Renewals_basic(RenewalBasic) table
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
	 * Set start date field of t_Renewals_basic(RenewalBasic) table
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
	 * Get completion date field of t_Renewals_basic(RenewalBasic) table
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
	 * Set completion date field of t_Renewals_basic(RenewalBasic) table
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
	 * Get supplier number field of t_Renewals_basic(RenewalBasic) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return supplierNumber of type String
	 *
	 */
	public String getSupplierNumber() {
		return supplierNumber;
	}

	/**
	 * Set supplier number field of t_Renewals_basic(RenewalBasic) table
	 * 
	 * @author Sowmya
	 * @param supplierNumber-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setSupplierNumber(String supplierNumber) {
		this.supplierNumber = supplierNumber;
	}

	/**
	 * Get supplier name field of t_Renewals_basic(RenewalBasic) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return supplierName of type String
	 *
	 */
	public String getSupplierName() {
		return supplierName;
	}

	/**
	 * Set supplier name field of t_Renewals_basic(RenewalBasic) table
	 * 
	 * @author Sowmya
	 * @param supplierName-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	/**
	 * Get hourly field of t_Renewals_basic(RenewalBasic) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return hourly of type String
	 *
	 */
	public String getHourly() {
		return hourly;
	}

	/**
	 * Set hourly field of t_Renewals_basic(RenewalBasic) table
	 * 
	 * @author Sowmya
	 * @param hourly-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setHourly(String hourly) {
		this.hourly = hourly;
	}

	/**
	 * Get fixed field of t_Renewals_basic(RenewalBasic) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return fixed of type String
	 *
	 */
	public String getFixed() {
		return fixed;
	}

	/**
	 * Set fixed field of t_Renewals_basic(RenewalBasic) table
	 * 
	 * @author Sowmya
	 * @param fixed-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setFixed(String fixed) {
		this.fixed = fixed;
	}

	/**
	 * Get additional exp field of t_Renewals_basic(RenewalBasic) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return additionalExp of type BigDecimal
	 *
	 */
	public BigDecimal getAdditionalExp() {
		return additionalExp;
	}

	/**
	 * Set additional exp field of t_Renewals_basic(RenewalBasic) table
	 * 
	 * @author Sowmya
	 * @param additionalExp-value of type BigDecimal
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setAdditionalExp(BigDecimal additionalExp) {
		this.additionalExp = additionalExp;
	}

	/**
	 * Get approval amt field of t_Renewals_basic(RenewalBasic) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return approvalAmt of type BigDecimal
	 *
	 */
	public BigDecimal getApprovalAmt() {
		return approvalAmt;
	}

	/**
	 * Set approval amt field of t_Renewals_basic(RenewalBasic) table
	 * 
	 * @author Sowmya
	 * @param approvalAmt-value of type BigDecimal
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setApprovalAmt(BigDecimal approvalAmt) {
		this.approvalAmt = approvalAmt;
	}

}
