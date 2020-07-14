package com.mmm.erfe.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.mmm.erfe.domain.RenewalAccount;
import com.mmm.erfe.domain.RenewalContact;
import com.mmm.erfe.domain.RenewalWorker;

/**
 * 
 * @author Sowmya
 *
 */

/**
 * @author Sowmya
 *
 */
public class RenewalBasicModel {
	/**
	 * approvalAmtM-Variable of type BigDecimal
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private BigDecimal approvalAmtM;
	/**
	 * additionalExpM-Variable of type BigDecimal
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private BigDecimal additionalExpM;
	/**
	 * projectTitleM-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private String projectTitleM;
	/**
	 * descriptionM-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private String descriptionM;
	/**
	 * startDateM-Variable of type Date
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private Date startDateM;
	/**
	 * completionDateM-Variable of type Date
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private Date completionDateM;
	/**
	 * supplierNumberM-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private String supplierNumberM;
	/**
	 * supplierNameM-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private String supplierNameM;
	/**
	 * hourlyM-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private String hourlyM;
	/**
	 * fixedM-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private String fixedM;
	/**
	 * workerDetails-Variable of type List<RenewalWorker>
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private List<RenewalWorker> workerDetails;
	/**
	 * accountDetails-Variable of type List<RenewalAccount>
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private List<RenewalAccount> accountDetails;
	/**
	 * infoDetails-Variable of type List<RenewalContact>
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	private List<RenewalContact> infoDetails;

	/**
	 * Constructor
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	public RenewalBasicModel() {
		super();
	}

	/**
	 * Get worker details
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return workerDetails of type List<RenewalWorker>
	 *
	 */
	public List<RenewalWorker> getWorkerDetails() {
		return workerDetails;
	}

	/**
	 * Set worker details
	 * 
	 * @author Sowmya
	 * @param workerDetails-value of type List<RenewalWorker>
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setWorkerDetails(List<RenewalWorker> workerDetails) {
		this.workerDetails = workerDetails;
	}

	/**
	 * Get Account details
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return accountDetails of type List<RenewalAccount>
	 *
	 */
	public List<RenewalAccount> getAccountDetails() {
		return accountDetails;
	}

	/**
	 * Set Account details
	 * 
	 * @author Sowmya
	 * @param accountDetails-value of type List<RenewalAccount>
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setAccountDetails(List<RenewalAccount> accountDetails) {
		this.accountDetails = accountDetails;
	}

	/**
	 * Get informational copy details
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return infoDetails of type List<RenewalContact>
	 *
	 */
	public List<RenewalContact> getInfoDetails() {
		return infoDetails;
	}

	/**
	 * Set informational copy details
	 * 
	 * @author Sowmya
	 * @param infoDetails-value of type List<RenewalContact>
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setInfoDetails(List<RenewalContact> infoDetails) {
		this.infoDetails = infoDetails;
	}

	/**
	 * Get Approval Amount
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return approvalAmtM of type BigDecimal
	 *
	 */
	public BigDecimal getApprovalAmtM() {
		return approvalAmtM;
	}

	/**
	 * Set Approval Amount
	 * 
	 * @author Sowmya
	 * @param approvalAmtM-value of type BigDecimal
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setApprovalAmtM(BigDecimal approvalAmtM) {
		this.approvalAmtM = approvalAmtM;
	}

	/**
	 * Get Additional expenses
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return additionalExpM of type BigDecimal
	 *
	 */
	public BigDecimal getAdditionalExpM() {
		return additionalExpM;
	}

	/**
	 * Set Additional expenses
	 * 
	 * @author Sowmya
	 * @param additionalExpM-value of type BigDecimal
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setAdditionalExpM(BigDecimal additionalExpM) {
		this.additionalExpM = additionalExpM;
	}

	/**
	 * Get Project title
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return projectTitleM of type String
	 *
	 */
	public String getProjectTitleM() {
		return projectTitleM;
	}

	/**
	 * Set Project title
	 * 
	 * @author Sowmya
	 * @param projectTitleM-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setProjectTitleM(String projectTitleM) {
		this.projectTitleM = projectTitleM;
	}

	/**
	 * Get Description
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return descriptionM of type String
	 *
	 */
	public String getDescriptionM() {
		return descriptionM;
	}

	/**
	 * Set Description
	 * 
	 * @author Sowmya
	 * @param descriptionM-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setDescriptionM(String descriptionM) {
		this.descriptionM = descriptionM;
	}

	/**
	 * Get Start date
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return startDateM of type Date
	 *
	 */
	public Date getStartDateM() {
		return startDateM;
	}

	/**
	 * Set Start date
	 * 
	 * @author Sowmya
	 * @param startDateM-value of type Date
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setStartDateM(Date startDateM) {
		this.startDateM = startDateM;
	}

	/**
	 * Get Completion date
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return completionDateM of type Date
	 *
	 */
	public Date getCompletionDateM() {
		return completionDateM;
	}

	/**
	 * Set Completion date
	 * 
	 * @author Sowmya
	 * @param completionDateM-value of type Date
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setCompletionDateM(Date completionDateM) {
		this.completionDateM = completionDateM;
	}

	/**
	 * Get Supplier Number
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return supplierNumberM of type String
	 *
	 */
	public String getSupplierNumberM() {
		return supplierNumberM;
	}

	/**
	 * Set Supplier Number
	 * 
	 * @author Sowmya
	 * @param supplierNumberM-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setSupplierNumberM(String supplierNumberM) {
		this.supplierNumberM = supplierNumberM;
	}

	/**
	 * Get Supplier Name
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return supplierNameM of type String
	 *
	 */
	public String getSupplierNameM() {
		return supplierNameM;
	}

	/**
	 * Set Supplier Name
	 * 
	 * @author Sowmya
	 * @param supplierNameM-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setSupplierNameM(String supplierNameM) {
		this.supplierNameM = supplierNameM;
	}

	/**
	 * Get Hourly value
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return hourlyM of type String
	 *
	 */
	public String getHourlyM() {
		return hourlyM;
	}

	/**
	 * Set Hourly value
	 * 
	 * @author Sowmya
	 * @param hourlyM-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setHourlyM(String hourlyM) {
		this.hourlyM = hourlyM;
	}

	/**
	 * Get Fixed value
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return approvalAmtM of type BigDecimal
	 *
	 */
	public String getFixedM() {
		return fixedM;
	}

	/**
	 * Set Fixed value
	 * 
	 * @author Sowmya
	 * @param fixedM-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setFixedM(String fixedM) {
		this.fixedM = fixedM;
	}

}
