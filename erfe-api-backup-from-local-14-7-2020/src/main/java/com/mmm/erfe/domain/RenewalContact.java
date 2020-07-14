package com.mmm.erfe.domain;

import java.io.Serializable;
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
@Table(name = "t_Renewals_information_copy")
public class RenewalContact implements Serializable {

	/**
	 * renewalCntId-Auto incremented primary key variable of type Integer
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "renewal_contact_id", nullable = false)
	private Integer renewalCntId;

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
	 * siteCntc-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "SITE_CTCT_PRSN_ID")
	private String siteCntc;

	/**
	 * projCord-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "PROJ_CRDNTR_PRSN_ID")
	private String projCord;

	/**
	 * infoCopy-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "INFO_CPY_PRSN_ID")
	private String infoCopy;

	/**
	 * Get renewal cnt id field of t_Renewals_information_copy(RenewalContact) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return renewalCntId of type Integer
	 *
	 */
	public Integer getRenewalCntId() {
		return renewalCntId;
	}

	/**
	 * Set renewal cnt id field of t_Renewals_information_copy(RenewalContact) table
	 * 
	 * @author Sowmya
	 * @param renewalCntId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setRenewalCntId(Integer renewalCntId) {
		this.renewalCntId = renewalCntId;
	}

	/**
	 * Get rfe no field of t_Renewals_information_copy(RenewalContact) table
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
	 * Set rfe no field of t_Renewals_information_copy(RenewalContact) table
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
	 * Get site cntc field of t_Renewals_information_copy(RenewalContact) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return siteCntc of type String
	 *
	 */
	public String getSiteCntc() {
		return siteCntc;
	}

	/**
	 * Set site cntc field of t_Renewals_information_copy(RenewalContact) table
	 * 
	 * @author Sowmya
	 * @param siteCntc-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setSiteCntc(String siteCntc) {
		this.siteCntc = siteCntc;
	}

	/**
	 * Get proj cord field of t_Renewals_information_copy(RenewalContact) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return projCord of type String
	 *
	 */
	public String getProjCord() {
		return projCord;
	}

	/**
	 * Set proj cord field of t_Renewals_information_copy(RenewalContact) table
	 * 
	 * @author Sowmya
	 * @param projCord-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setProjCord(String projCord) {
		this.projCord = projCord;
	}

	/**
	 * Get info copy field of t_Renewals_information_copy(RenewalContact) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return infoCopy of type String
	 *
	 */
	public String getInfoCopy() {
		return infoCopy;
	}

	/**
	 * Set info copy field of t_Renewals_information_copy(RenewalContact) table
	 * 
	 * @author Sowmya
	 * @param infoCopy-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setInfoCopy(String infoCopy) {
		this.infoCopy = infoCopy;
	}

}
