package com.mmm.erfe.domain;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

/**
 * 
 * @author Senthil
 *
 */

/**
 * @author Senthil
 *
 */
@Entity
@Table(name = "t_bid_master_detail")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class BidMaster implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * bidId-Auto incremented primary key variable of type Integer
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "bid_Type_id", updatable = false, nullable = false)
	private Integer bidId;

	/**
	 * bidName-Variable of type String
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "bid_type_name", nullable = false)
	private String bidName;

	/**
	 * Constructor
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	public BidMaster() {

	}

	/**
	 * Parameterized Constructor
	 * 
	 * @author Senthil
	 * @param bidName-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public BidMaster(String bidName) {
		this.bidName = bidName;
	}

	/**
	 * Get bid id field of t_bid_master_detail(BidMaster) table
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return bidId of type Integer
	 *
	 */
	public Integer getBidId() {
		return bidId;
	}

	/**
	 * Set bid id field of t_bid_master_detail(BidMaster) table
	 * 
	 * @author Senthil
	 * @param bidId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setBidId(Integer bidId) {
		this.bidId = bidId;
	}

	/**
	 * Get bid name field of t_bid_master_detail(BidMaster) table
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return bidName of type String
	 *
	 */
	public String getBidName() {
		return bidName;
	}

	/**
	 * Set bid name field of t_bid_master_detail(BidMaster) table
	 * 
	 * @author Senthil
	 * @param bidName-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setBidName(String bidName) {
		this.bidName = bidName;
	}
}
