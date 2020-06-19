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

/**
 * @author Sowmya
 *
 */
@Entity
@Table(name = "t_corp_information")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class CorpInformation implements Serializable {

	/**
	 * infoId-Auto incremented primary key variable of type Integer
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "info_id", nullable = false)
	private int infoId;

	/**
	 * informationPersonId-Variable of type GlobalUser
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Information_Person_Id", nullable = false)
	private GlobalUser informationPersonId;

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
	public CorpInformation() {
		super();
	}

	/**
	 * Get info id field of t_corp_information(CorpInformation) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return infoId of type Integer
	 *
	 */
	public int getInfoId() {
		return infoId;
	}

	/**
	 * Set info id field of t_corp_information(CorpInformation) table
	 * 
	 * @author Sowmya
	 * @param infoId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setInfoId(int infoId) {
		this.infoId = infoId;
	}

	/**
	 * Get Order Seq field of t_corp_information(CorpInformation) table
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
	 * Set Order Seq field of t_corp_information(CorpInformation) table
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
	 * Get information person id field of t_corp_information(CorpInformation) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return getInformationPersonId of type GlobalUser
	 *
	 */
	public GlobalUser getInformationPersonId() {
		return informationPersonId;
	}

	/**
	 * Set information person id field of t_corp_information(CorpInformation) table
	 * 
	 * @author Sowmya
	 * @param informationPersonId-value of type GlobalUser
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setInformationPersonId(GlobalUser informationPersonId) {
		this.informationPersonId = informationPersonId;
	}

	/**
	 * Get created date field of t_corp_information(CorpInformation) table
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
	 * Set created date field of t_corp_information(CorpInformation) table
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
	 * Get modified date field of t_corp_information(CorpInformation) table
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
	 * Set modified date field of t_corp_information(CorpInformation) table
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
	 * Get created person id field of t_corp_information(CorpInformation) table
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
	 * Set created person id field of t_corp_information(CorpInformation) table
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
	 * Get modified person id field of t_corp_information(CorpInformation) table
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
	 * Set modified person id field of t_corp_information(CorpInformation) table
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
