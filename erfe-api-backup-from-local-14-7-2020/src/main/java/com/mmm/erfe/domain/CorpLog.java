package com.mmm.erfe.domain;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

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
@Table(name = "t_corp_log_info")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class CorpLog implements Serializable {

	/**
	 * corpLogId-Auto incremented primary key variable of type Integer
	 * 
	 * @author Sowmya
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
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "log_action", nullable = false)
	private String logAction;

	/**
	 * logPersonPin-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Log_Person_Pin", nullable = false)
	private String logPersonPin;

	/**
	 * logDesc-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Log_Desc", nullable = false)
	private String logDesc;

	/**
	 * logActionDate-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Log_Action_Date", nullable = false)
	private String logActionDate;

	/**
	 * Parameterized Constructor
	 * 
	 * @author Sowmya
	 * @param logAction-value of type String, logPersonPin-value of type String,
	 *                        logDesc-value of type String, logActionDate-value of
	 *                        type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public CorpLog(String logAction, String logPersonPin, String logDesc, String logActionDate) {
		this.logAction = logAction;
		this.logPersonPin = logPersonPin;
		this.logDesc = logDesc;
		this.logActionDate = logActionDate;
	}

	/**
	 * Get corp log id field of t_corp_log_info(CorpLog) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return corpLogId of type Integer
	 *
	 */
	public int getCorpLogId() {
		return corpLogId;
	}

	/**
	 * Set corp log id field of t_corp_log_info(CorpLog) table
	 * 
	 * @author Sowmya
	 * @param corpLogId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setCorpLogId(int corpLogId) {
		this.corpLogId = corpLogId;
	}

	/**
	 * Get log action field of t_corp_log_info(CorpLog) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return logAction of type String
	 *
	 */
	public String getLogAction() {
		return logAction;
	}

	/**
	 * Set log action field of t_corp_log_info(CorpLog) table
	 * 
	 * @author Sowmya
	 * @param logAction-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setLogAction(String logAction) {
		this.logAction = logAction;
	}

	/**
	 * Get log person pin field of t_corp_log_info(CorpLog) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return logPersonPin of type String
	 *
	 */
	public String getLogPersonPin() {
		return logPersonPin;
	}

	/**
	 * Set log person pin field of t_corp_log_info(CorpLog) table
	 * 
	 * @author Sowmya
	 * @param logPersonPin-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setLogPersonPin(String logPersonPin) {
		this.logPersonPin = logPersonPin;
	}

	/**
	 * Get log desc field of t_corp_log_info(CorpLog) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return logDesc of type String
	 *
	 */
	public String getLogDesc() {
		return logDesc;
	}

	/**
	 * Set log desc field of t_corp_log_info(CorpLog) table
	 * 
	 * @author Sowmya
	 * @param logDesc-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setLogDesc(String logDesc) {
		this.logDesc = logDesc;
	}

	/**
	 * Get log action date field of t_corp_log_info(CorpLog) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return logActionDate of type String
	 *
	 */
	public String getLogActionDate() {
		return logActionDate;
	}

	/**
	 * Set log action date field of t_corp_log_info(CorpLog) table
	 * 
	 * @author Sowmya
	 * @param logActionDate-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setLogActionDate(String logActionDate) {
		this.logActionDate = logActionDate;
	}
}
