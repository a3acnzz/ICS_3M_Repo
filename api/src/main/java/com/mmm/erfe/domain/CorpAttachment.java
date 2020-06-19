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
@Table(name = "t_corp_attachment")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class CorpAttachment implements Serializable {

	/**
	 * CorpAttachmentId-Auto incremented primary key variable of type Integer
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Corp_Attachment_Id", nullable = false)
	private int CorpAttachmentId;

	/**
	 * attachmentType-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Attachment_type", nullable = false)
	private String attachmentType;

	/**
	 * fileName-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "fileName", nullable = false)
	private String fileName;

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
	 * Parameterized Constructor
	 * 
	 * @author Sowmya
	 * @param attachmentType-value of type String, fileName-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public CorpAttachment(String attachmentType, String fileName) {
		this.attachmentType = attachmentType;
		this.fileName = fileName;
	}

	/**
	 * Constructor
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	public CorpAttachment() {

	}

	/**
	 * Get Corp attachment id field of t_corp_attachment(CorpAttachment) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return CorpAttachmentId of type Integer
	 *
	 */
	public int getCorpAttachmentId() {
		return CorpAttachmentId;
	}

	/**
	 * Set corp attachment id field of t_corp_attachment(CorpAttachment) table
	 * 
	 * @author Sowmya
	 * @param corpAttachmentId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setCorpAttachmentId(int corpAttachmentId) {
		CorpAttachmentId = corpAttachmentId;
	}

	/**
	 * Get attachment type field of t_corp_attachment(CorpAttachment) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return attachmentType of type String
	 *
	 */
	public String getAttachmentType() {
		return attachmentType;
	}

	/**
	 * Set attachment type field of t_corp_attachment(CorpAttachment) table
	 * 
	 * @author Sowmya
	 * @param attachmentType-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setAttachmentType(String attachmentType) {
		this.attachmentType = attachmentType;
	}

	/**
	 * Get file name field of t_corp_attachment(CorpAttachment) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return fileName of type String
	 *
	 */
	public String getFileName() {
		return fileName;
	}

	/**
	 * Set file name field of t_corp_attachment(CorpAttachment) table
	 * 
	 * @author Sowmya
	 * @param fileName-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	/**
	 * Get created person id field of t_corp_attachment(CorpAttachment) table
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
	 * Set created person id field of t_corp_attachment(CorpAttachment) table
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
	 * Get created date field of t_corp_attachment(CorpAttachment) table
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
	 * Set created date field of t_corp_attachment(CorpAttachment) table
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
	 * Get modified person id field of t_corp_attachment(CorpAttachment) table
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
	 * Set modified person id field of t_corp_attachment(CorpAttachment) table
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
	 * Get modified date field of t_corp_attachment(CorpAttachment) table
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
	 * Set modified date field of t_corp_attachment(CorpAttachment) table
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
