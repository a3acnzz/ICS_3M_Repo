package com.mmm.erfe.domain;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.math.BigDecimal;

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
@Table(name = "t_Renewals_worker_information")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class RenewalWorker implements Serializable {

	/**
	 * renewalWrkId-Auto incremented primary key variable of type Integer
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "renewal_worker_id", nullable = false)
	private Integer renewalWrkId;

	/**
	 * rfeNo-Variable of type Integer
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "rfa_nbr", nullable = true)
	private Integer rfeNo;

	/**
	 * hours-Variable of type BigDecimal
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "HOUR_QTY", nullable = true)
	private BigDecimal hours;

	/**
	 * desginatedNbr-Variable of type Integer
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "DSGNTD_NBR", nullable = true)
	private Integer desginatedNbr;

	/**
	 * contractNbr-Variable of type Integer
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "CNTR_NBR", nullable = true)
	private Integer contractNbr;

	/**
	 * amt-Variable of type BigDecimal
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "RATE_AMT", nullable = true)
	private BigDecimal amt;

	/**
	 * Constructor
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	public RenewalWorker() {
		super();
	}

	/**
	 * Get renewal wrk id field of t_Renewals_worker_information(RenewalWorker)
	 * table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return renewalWrkId of type Integer
	 *
	 */
	public Integer getRenewalWrkId() {
		return renewalWrkId;
	}

	/**
	 * Set renewal wrk id field of t_Renewals_worker_information(RenewalWorker)
	 * table
	 * 
	 * @author Sowmya
	 * @param renewalWrkId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setRenewalWrkId(Integer renewalWrkId) {
		this.renewalWrkId = renewalWrkId;
	}

	/**
	 * Get rfe no field of t_Renewals_worker_information(RenewalWorker) table
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
	 * Set rfe no field of t_Renewals_worker_information(RenewalWorker) table
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
	 * Get hours field of t_Renewals_worker_information(RenewalWorker) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return hours of type BigDecimal
	 *
	 */
	public BigDecimal getHours() {
		return hours;
	}

	/**
	 * Set hours field of t_Renewals_worker_information(RenewalWorker) table
	 * 
	 * @author Sowmya
	 * @param hours-value of type BigDecimal
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setHours(BigDecimal hours) {
		this.hours = hours;
	}

	/**
	 * Get desginated nbr field of t_Renewals_worker_information(RenewalWorker)
	 * table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return desginatedNbr of type Integer
	 *
	 */
	public Integer getDesginatedNbr() {
		return desginatedNbr;
	}

	/**
	 * Set desginated nbr field of t_Renewals_worker_information(RenewalWorker)
	 * table
	 * 
	 * @author Sowmya
	 * @param desginatedNbr-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setDesginatedNbr(Integer desginatedNbr) {
		this.desginatedNbr = desginatedNbr;
	}

	/**
	 * Get contract nbr field of t_Renewals_worker_information(RenewalWorker) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return contractNbr of type Integer
	 *
	 */
	public Integer getContractNbr() {
		return contractNbr;
	}

	/**
	 * Set contract nbr field of t_Renewals_worker_information(RenewalWorker) table
	 * 
	 * @author Sowmya
	 * @param contractNbr-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setContractNbr(Integer contractNbr) {
		this.contractNbr = contractNbr;
	}

	/**
	 * Get amt field of t_Renewals_worker_information(RenewalWorker) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return amt of type BigDecimal
	 *
	 */
	public BigDecimal getAmt() {
		return amt;
	}

	/**
	 * Set amt field of t_Renewals_worker_information(RenewalWorker) table
	 * 
	 * @author Sowmya
	 * @param amt-value of type BigDecimal
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setAmt(BigDecimal amt) {
		this.amt = amt;
	}

}
