package com.mmm.erfe.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
@Table(name = "t_corp_log_info")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class ActivityLog implements Serializable {

	/**
	 * corpLogId-Auto incremented primary key variable of type Integer
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Corp_Log_Id", nullable = false)
	private int corpLogId;

	/**
	 * logAction-Variable of type String
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Log_Action", nullable = false)
	private String logAction;

	/**
	 * logPersonPin-Variable of type GlobalUser
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Log_Person_id", nullable = false)
	private GlobalUser logPersonPin;

	/**
	 * logDesc-Variable of type String
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Log_Desc")
	private String logDesc;

	/**
	 * logActionDate-Variable of type Date
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Log_Action_Date", nullable = false)
	private Date logActionDate;

	/**
	 * Constructor
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	public ActivityLog() {
		super();
	}

	/**
	 * Get corp log id field of t_corp_log_info(ActivityLog) table
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return corpLogId of type Integer
	 *
	 */
	public int getCorpLogId() {
		return corpLogId;
	}

	/**
	 * Set corp log id field of t_corp_log_info(ActivityLog) table
	 * 
	 * @author Senthil
	 * @param corpLogId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setCorpLogId(int corpLogId) {
		this.corpLogId = corpLogId;
	}

	/**
	 * Get log action field of t_corp_log_info(ActivityLog) table
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return logAction of type String
	 *
	 */
	public String getLogAction() {
		return logAction;
	}

	/**
	 * Set log action field of t_corp_log_info(ActivityLog) table
	 * 
	 * @author Senthil
	 * @param logAction-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setLogAction(String logAction) {
		this.logAction = logAction;
	}

	/**
	 * Get log person pin field of t_corp_log_info(ActivityLog) table
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return logPersonPin of type GlobalUser
	 *
	 */
	public GlobalUser getLogPersonPin() {
		return logPersonPin;
	}

	/**
	 * Set log person pin field of t_corp_log_info(ActivityLog) table
	 * 
	 * @author Senthil
	 * @param logPersonPin-value of type GlobalUser
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setLogPersonPin(GlobalUser logPersonPin) {
		this.logPersonPin = logPersonPin;
	}

	/**
	 * Get log desc field of t_corp_log_info(ActivityLog) table
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return logDesc of type String
	 *
	 */
	public String getLogDesc() {
		return logDesc;
	}

	/**
	 * Set log desc field of t_corp_log_info(ActivityLog) table
	 * 
	 * @author Senthil
	 * @param logDesc-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setLogDesc(String logDesc) {
		this.logDesc = logDesc;
	}

	/**
	 * Get log action date field of t_corp_log_info(ActivityLog) table
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return logActionDate of type Date
	 *
	 */
	public Date getLogActionDate() {
		return logActionDate;
	}

	/**
	 * Set log action date field of t_corp_log_info(ActivityLog) table
	 * 
	 * @author Senthil
	 * @param logActionDate-value of type Date
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setLogActionDate(Date logActionDate) {
		this.logActionDate = logActionDate;
	}

}