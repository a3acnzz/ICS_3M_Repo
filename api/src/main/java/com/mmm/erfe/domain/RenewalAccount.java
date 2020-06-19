package com.mmm.erfe.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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
@Table(name = "t_Renewals_accounting_information")
public class RenewalAccount implements Serializable {

	/**
	 * renewalAcctId-Auto incremented primary key variable of type Integer
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "renewal_acct_id", nullable = false)
	private Integer renewalAcctId;

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
	 * deptId-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Dept_id")
	private String deptId;

	/**
	 * distPer-Variable of type BigDecimal
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Distribution_per")
	private BigDecimal distPer;

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
	 * accountId-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "ACCOUNT")
	private String accountId;

	/**
	 * otherDesc-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "ADDL_COA_IND")
	private String otherDesc;

	/**
	 * Constructor
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	public RenewalAccount() {
		super();
	}

	/**
	 * Get renewal acct id field of
	 * t_Renewals_accounting_information(RenewalAccount) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return renewalAcctId of type Integer
	 *
	 */
	public Integer getRenewalAcctId() {
		return renewalAcctId;
	}

	/**
	 * Set renewal acct id field of
	 * t_Renewals_accounting_information(RenewalAccount) table
	 * 
	 * @author Sowmya
	 * @param renewalAcctId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setRenewalAcctId(Integer renewalAcctId) {
		this.renewalAcctId = renewalAcctId;
	}

	/**
	 * Get rfe no field of t_Renewals_accounting_information(RenewalAccount) table
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
	 * Set rfe no field of t_Renewals_accounting_information(RenewalAccount) table
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
	 * Get dept id field of t_Renewals_accounting_information(RenewalAccount) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return deptId of type String
	 *
	 */
	public String getDeptId() {
		return deptId;
	}

	/**
	 * Set dept id field of t_Renewals_accounting_information(RenewalAccount) table
	 * 
	 * @author Sowmya
	 * @param deptId-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}

	/**
	 * Get dist per field of t_Renewals_accounting_information(RenewalAccount) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return distPer of type BigDecimal
	 *
	 */
	public BigDecimal getDistPer() {
		return distPer;
	}

	/**
	 * Set dist per field of t_Renewals_accounting_information(RenewalAccount) table
	 * 
	 * @author Sowmya
	 * @param distPer-value of type BigDecimal
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setDistPer(BigDecimal distPer) {
		this.distPer = distPer;
	}

	/**
	 * Get wbs field of t_Renewals_accounting_information(RenewalAccount) table
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
	 * Set wbs field of t_Renewals_accounting_information(RenewalAccount) table
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
	 * Get account id field of t_Renewals_accounting_information(RenewalAccount)
	 * table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return accountId of type String
	 *
	 */
	public String getAccountId() {
		return accountId;
	}

	/**
	 * Set account id field of t_Renewals_accounting_information(RenewalAccount)
	 * table
	 * 
	 * @author Sowmya
	 * @param accountId-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}

	/**
	 * Get other desc field of t_Renewals_accounting_information(RenewalAccount)
	 * table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return otherDesc of type String
	 *
	 */
	public String getOtherDesc() {
		return otherDesc;
	}

	/**
	 * Set other desc field of t_Renewals_accounting_information(RenewalAccount)
	 * table
	 * 
	 * @author Sowmya
	 * @param otherDesc-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setOtherDesc(String otherDesc) {
		this.otherDesc = otherDesc;
	}

}
