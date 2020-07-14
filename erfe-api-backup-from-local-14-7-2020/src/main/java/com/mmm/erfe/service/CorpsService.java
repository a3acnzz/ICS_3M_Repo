package com.mmm.erfe.service;

import com.mmm.erfe.domain.CorpAttachment;
import com.mmm.erfe.domain.CorpPsRFE;
import com.mmm.erfe.domain.RfeNumData;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * CorpsService implemented by CorpsServiceImpl
 * 
 * @author RajKumar
 *
 */
public interface CorpsService {

	/**
	 * Fetching all the Corp PS Rfe values
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws nothing
	 * @return Collection of <CorpPsRFE>
	 */
	Collection<CorpPsRFE> findAll();

	/**
	 * Inserting the Corp PS Rfe data
	 * 
	 * @author Rajkumar
	 * @param corpPsRFE
	 * @param files
	 * @throws nothing
	 * @return CorpPsRFE
	 */
	CorpPsRFE createCorpPsRFE(CorpPsRFE corpPsRFE, MultipartFile[] files,CorpAttachment[] attachments,String oldCorpReq);

	/**
	 * Saves the attached file
	 * 
	 * @author Rajkumar
	 * @param corpPsRFE
	 * @param files
	 * @throws nothing
	 * @return CorpPsRFE
	 */
	public CorpPsRFE update(CorpPsRFE corpPsRFE, MultipartFile[] files);

	/**
	 * Fetching the Corp PS Rfe data based on given id
	 * 
	 * @author Rajkumar
	 * @param id
	 * @throws nothing
	 * @return CorpPsRFE
	 */
	public CorpPsRFE findOne(Integer id);

	/**
	 * Displays Corp PS information based on CorpPS Request Number
	 * 
	 * @author Rajkumar
	 * @param corpPsReqNum
	 * @throws nothing
	 * @return CorpPsRFE
	 */
	Optional<CorpPsRFE> findByCorpPSReqNum(String corpPsReqNum);

	/**
	 * Displays the Corp PS Request Number
	 * 
	 * @author Rajkumar
	 * @param personId
	 * @throws nothing
	 * @return RfeNumData
	 */
	Optional<RfeNumData> findByPersonId(String personId);

	/**
	 * Deletes the attached file
	 * 
	 * @author Rajkumar
	 * @param attachmentFileId
	 * @throws nothing
	 * @return Integer
	 */
	int deleteAttachmentFile(int attachmentFileId);

	/**
	 * Downloads the attached file
	 * 
	 * @author Rajkumar
	 * @param corpPsRfeNum
	 * @param fileName
	 * @throws nothing
	 * @return Resource
	 */
	Resource loadFile(String corpPsRfeNum, String fileName);

	public boolean jobTrigger(String jobName);

	public List<Object> jobHistory(String jobName);

}
