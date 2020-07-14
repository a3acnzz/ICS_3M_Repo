package com.mmm.erfe.domain;

import javax.persistence.*;
import java.io.Serializable;
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
@Table(name = "t_corp_accounting_information")
public class CorpAccountingInformation implements Serializable {

	/**
	 * corpAccountId-Auto incremented primary key variable of type Integer
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Corp_Account_Id", nullable = false)
	private int corpAccountId;

	/**
	 * accountMaster-Variable of type AccountMaster
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Account_Id", nullable = false)
	private AccountMaster accountMaster;

	/**
	 * departmentMaster-Variable of type DepartmentMaster
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Dept_Id", nullable = false)
	private DepartmentMaster departmentMaster;

	/**
	 * wbs-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "WBS")
	private String wbs;

	/**
	 * accountFields-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Other_Desc")
	private String accountFields;

	/**
	 * distributionPer-Variable of type float
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Distribution_Per")
	private float distributionPer;

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
	 * createdPersonId-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name="Created_Person_Id",nullable = false)
	@Column(name = "Created_Person_Id", nullable = true)
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
//    @JoinColumn(name="Modified_Person_Id",nullable = false)
	@Column(name = "Modified_Person_Id", nullable = true)
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
	public CorpAccountingInformation() {

	}

	/**
	 * Get order seq field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
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
	 * Set order seq field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
	 * 
	 * @author Sowmya
	 * @param orderSeq-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setOrderSeq(int orderSeq) {
		this.orderSeq = orderSeq;
	}

	/**
	 * Get corp account id field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return corpAccountId of type Integer
	 *
	 */
	public int getCorpAccountId() {
		return corpAccountId;
	}

	/**
	 * Set corp account id field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
	 * 
	 * @author Sowmya
	 * @param corpAccountId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setCorpAccountId(int corpAccountId) {
		this.corpAccountId = corpAccountId;
	}

	/**
	 * Get account master field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return accountMaster of type AccountMaster
	 *
	 */
	public AccountMaster getAccountMaster() {
		return accountMaster;
	}

	/**
	 * Set account master field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
	 * 
	 * @author Sowmya
	 * @param accountMaster-value of type AccountMaster
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setAccountMaster(AccountMaster accountMaster) {
		this.accountMaster = accountMaster;
	}

	/**
	 * Get department master field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return departmentMaster of type DepartmentMaster
	 *
	 */
	public DepartmentMaster getDepartmentMaster() {
		return departmentMaster;
	}

	/**
	 * Set department master field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
	 * 
	 * @author Sowmya
	 * @param departmentMaster-value of type DepartmentMaster
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setDepartmentMaster(DepartmentMaster departmentMaster) {
		this.departmentMaster = departmentMaster;
	}

	/**
	 * Get wbs field of t_corp_accounting_information(CorpAccountingInformation)
	 * table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return wbs of type String
	 *
	 */
	public String getWbs() {
		return wbs;
	}

	/**
	 * Set wbs field of t_corp_accounting_information(CorpAccountingInformation)
	 * table
	 * 
	 * @author Sowmya
	 * @param wbs-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setWbs(String wbs) {
		this.wbs = wbs;
	}

	/**
	 * Get account fields field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return accountFields of type String
	 *
	 */
	public String getAccountFields() {
		return accountFields;
	}

	/**
	 * Set account fields field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
	 * 
	 * @author Sowmya
	 * @param accountFields-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setAccountFields(String accountFields) {
		this.accountFields = accountFields;
	}

	/**
	 * Get distribution per field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return distributionPer of type float
	 *
	 */
	public float getDistributionPer() {
		return distributionPer;
	}

	/**
	 * Set distribution per field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
	 * 
	 * @author Sowmya
	 * @param distributionPer-value of type float
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setDistributionPer(float distributionPer) {
		this.distributionPer = distributionPer;
	}

	/**
	 * Get created person id field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
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
	 * Set created person id field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
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
	 * Get created date field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
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
	 * Set created date field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
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
	 * Get modified person id field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
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
	 * Set modified person id field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
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
	 * Get modified date field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
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
	 * Set modified date field of
	 * t_corp_accounting_information(CorpAccountingInformation) table
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

}
