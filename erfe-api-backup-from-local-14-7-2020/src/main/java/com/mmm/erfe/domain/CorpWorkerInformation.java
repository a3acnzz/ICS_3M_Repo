package com.mmm.erfe.domain;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
@Table(name = "t_corp_worker_information")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class CorpWorkerInformation implements Serializable {

	/**
	 * corpWorkerId-Auto incremented primary key variable of type Integer
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Corp_Worker_Id", nullable = false)
	private int corpWorkerId;

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
	 * resourceTitle-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Resource_Title", nullable = false)
	private String resourceTitle;

	/**
	 * estimatedHours-Variable of type float
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Est_Hours", nullable = false)
	private float estimatedHours;

	/**
	 * rate-Variable of type float
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "rate", nullable = false)
	private BigDecimal rate;

	/**
	 * createdPersonId-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "Created_Person_Id")
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
	@Column(name = "Created_Date")
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
	@Column(name = "Modified_Date")
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
	public CorpWorkerInformation() {
	}

	/**
	 * Get corp worker id field of t_corp_worker_information(CorpWorkerInformation)
	 * table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return corpWorkerId of type Integer
	 *
	 */
	public int getCorpWorkerId() {
		return corpWorkerId;
	}

	/**
	 * Set corp worker id field of t_corp_worker_information(CorpWorkerInformation)
	 * table
	 * 
	 * @author Sowmya
	 * @param corpWorkerId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setCorpWorkerId(int corpWorkerId) {
		this.corpWorkerId = corpWorkerId;
	}

	/**
	 * Get order seq field of t_corp_worker_information(CorpWorkerInformation) table
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
	 * Set order seq field of t_corp_worker_information(CorpWorkerInformation) table
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
	 * Get resource title field of t_corp_worker_information(CorpWorkerInformation)
	 * table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return resourceTitle of type String
	 *
	 */
	public String getResourceTitle() {
		return resourceTitle;
	}

	/**
	 * Set resource title field of t_corp_worker_information(CorpWorkerInformation)
	 * table
	 * 
	 * @author Sowmya
	 * @param resourceTitle-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setResourceTitle(String resourceTitle) {
		this.resourceTitle = resourceTitle;
	}

	/**
	 * Get estimated hours field of t_corp_worker_information(CorpWorkerInformation)
	 * table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return estimatedHours of type float
	 *
	 */
	public float getEstimatedHours() {
		return estimatedHours;
	}

	/**
	 * Set estimated hours field of t_corp_worker_information(CorpWorkerInformation)
	 * table
	 * 
	 * @author Sowmya
	 * @param estimatedHours-value of type float
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setEstimatedHours(float estimatedHours) {
		this.estimatedHours = estimatedHours;
	}

	/**
	 * Get rate field of t_corp_worker_information(CorpWorkerInformation) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return rate of type float
	 *
	 */
	public BigDecimal getRate() {
		return rate;
	}

	/**
	 * Set rate field of t_corp_worker_information(CorpWorkerInformation) table
	 * 
	 * @author Sowmya
	 * @param rate-value of type float
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setRate(BigDecimal rate) {
		this.rate = rate;
	}

	/**
	 * Get created person id field of
	 * t_corp_worker_information(CorpWorkerInformation) table
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
	 * t_corp_worker_information(CorpWorkerInformation) table
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
	 * Get created date field of t_corp_worker_information(CorpWorkerInformation)
	 * table
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
	 * Set created date field of t_corp_worker_information(CorpWorkerInformation)
	 * table
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
	 * t_corp_worker_information(CorpWorkerInformation) table
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
	 * t_corp_worker_information(CorpWorkerInformation) table
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
	 * Get modified date field of t_corp_worker_information(CorpWorkerInformation)
	 * table
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
	 * Set modified date field of t_corp_worker_information(CorpWorkerInformation)
	 * table
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
