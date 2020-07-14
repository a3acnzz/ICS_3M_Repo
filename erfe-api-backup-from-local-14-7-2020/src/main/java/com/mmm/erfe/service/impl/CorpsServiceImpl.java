package com.mmm.erfe.service.impl;

import com.mmm.erfe.domain.CorpAttachment;
import com.mmm.erfe.domain.CorpPsRFE;
import com.mmm.erfe.domain.GlobalUser;
import com.mmm.erfe.domain.RfeNumData;
import com.mmm.erfe.repository.CorpAttachmentRepository;
import com.mmm.erfe.repository.CorpsRepository;
import com.mmm.erfe.repository.RfeNumDataRepository;
import com.mmm.erfe.service.CorpsService;
import com.mmm.erfe.util.FileHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.TimeZone;

import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureQuery;

/**
 * 
 * @author Senthil
 *
 */
/**
 * 
 * 
 * @author CorpsServiceImpl implements CorpsService Interface
 *
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class CorpsServiceImpl implements CorpsService {

	@Autowired
	CorpsRepository corpsRepository;

	@Autowired
	RfeNumDataRepository rfeNumDataRepository;

	@Autowired
	CorpAttachmentRepository corpAttachmentRepository;

	@Autowired
	FileHandler fileHandler;
	
    @Autowired
    private EntityManager entityManager;

	/**
	 * Fetching all the Corp PS Rfe values
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return corpPsRFES of Collection <CorpPsRFE>
	 */
	@Override
	public Collection<CorpPsRFE> findAll() {
		Collection<CorpPsRFE> corpPsRFES = corpsRepository.findAll();
		return corpPsRFES;
	}

	/**
	 * Inserting the Corp PS Rfe data
	 * 
	 * @author Senthil
	 * @param corpPsRFE
	 * @param files
	 * @throws Nothing
	 * @return
	 */
	  @Override
	    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	    public CorpPsRFE createCorpPsRFE(CorpPsRFE corpPsRFE, MultipartFile[] files,CorpAttachment[] attachments,String oldCorpReq) {
	    System.out.println(oldCorpReq);
	    
	           try {
//	               CorpPsRFE savedCorpPsRFE = corpsRepository.save(corpPsRFE);
	                  String psReqNum=corpPsRFE.getCorpPSReqNum();
	                  GlobalUser requestor=corpPsRFE.getRequesterPerson();
	                 
	                               
	                  Set<CorpAttachment> attachmentList = fileHandler.saveAttachment(files, corpPsRFE);
	                  
	                  attachmentList.addAll(fileHandler.saveCopy(corpPsRFE, oldCorpReq,attachments));
	                  corpPsRFE.setCorpAttachments(attachmentList);
	                  
	                  
	                  CorpPsRFE savedCorpPsRFE = corpsRepository.save(corpPsRFE);
	                  return savedCorpPsRFE;
	           } catch (Exception e) {
	                  e.printStackTrace();
	           }
	           return null;
	  }


	/**
	 * Saves the attached file
	 * 
	 * @author Senthil
	 * @param corpPsRFE
	 * @param files
	 * @throws Nothing
	 * @return corpPsRFE of CorpPsRFE
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public CorpPsRFE update(CorpPsRFE corpPsRFE, MultipartFile[] files) {
		Set<CorpAttachment> attachmentList = fileHandler.saveAttachment(files, corpPsRFE);
		corpPsRFE.setCorpAttachments(attachmentList);
		corpPsRFE = corpsRepository.save(corpPsRFE);
		return corpPsRFE;
	}

	/**
	 * Fetching the Corp PS Rfe data based on given id
	 * 
	 * @author Senthil
	 * @param id
	 * @throws Nothing
	 * @return corpPs of CorpPsRFE
	 */
	@Override
	public CorpPsRFE findOne(Integer id) {
		Optional<CorpPsRFE> corpPsRFE = corpsRepository.findByDocId(id);
		CorpPsRFE corpPs = corpPsRFE.get();
		return corpPs;
	}

	/**
	 * Displays Corp PS information based on CorpPS Request Number
	 * 
	 * @author Senthil
	 * @param corpPsReqNum
	 * @throws Nothing
	 * @return corpPs of CorpPsRFE
	 */
	@Override
	public Optional<CorpPsRFE> findByCorpPSReqNum(String corpPsReqNum) {
		Optional<CorpPsRFE> corpPsReqNumber = corpsRepository.findByCorpPSReqNum(corpPsReqNum);
		return corpPsReqNumber;
	}

	/**
	 * Displays the Corp PS Request Number
	 * 
	 * @author Senthil
	 * @param
	 * @throws Nothing
	 * @return rfeNumDataRepository of RfeNumData
	 */
    @Override
    public Optional<RfeNumData> findByPersonId(String personId) {
           
           Optional<RfeNumData> currentRfeNum=rfeNumDataRepository.findById(personId);
           System.out.println("get");
           RfeNumData current=currentRfeNum.get();
           String ps=current.getPsIdentity();
           String num=current.getReqNum();
           int updNum=Integer.parseInt(num)+1;
           String updatedNum="000000"+updNum;
           rfeNumDataRepository.upDateRfeNum(updatedNum.substring(updatedNum.length()-5), ps);
           return currentRfeNum;
    }


	/**
	 * Deletes the attached file
	 * 
	 * @author Senthil
	 * @param attachmentFileId
	 * @throws Nothing
	 * @return 1
	 */
	@Override
	public int deleteAttachmentFile(int attachmentFileId) {
		corpAttachmentRepository.deleteById(attachmentFileId);
		return 1;
	}

	/**
	 * Downloads the attached file
	 * 
	 * @author Senthil
	 * @param corpPSReqNum
	 * @param fileName
	 * @throws Nothing
	 * @return fileHandler of FileHandler
	 */
	@Override
	public Resource loadFile(String corpPSReqNum, String fileName) {
		return fileHandler.getFileForDownload(corpPSReqNum, fileName);
	}
	@Override
	public boolean jobTrigger(String jobName) {
		try {
			StoredProcedureQuery query = entityManager.createStoredProcedureQuery("execute_ssis_package_job");
			query.registerStoredProcedureParameter(1, String.class, ParameterMode.IN);
			query.setParameter(1, jobName);
			query.execute();
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public List<Object> jobHistory(String jobName) {
		try {
//			StoredProcedureQuery query = entityManager.createStoredProcedureQuery("job_history");
//			query.registerStoredProcedureParameter(1, String.class, ParameterMode.IN);
//			query.registerStoredProcedureParameter(2, String.class, ParameterMode.IN);
//			query.setParameter(1, jobName);
//			query.setParameter(2, "lastRunDate");
//			query.execute();
//			Object lastRunDate = query.getResultList();
//			System.out.println(lastRunDate);

			StoredProcedureQuery scheduledDatequery = entityManager.createStoredProcedureQuery("job_history");
			scheduledDatequery.registerStoredProcedureParameter(1, String.class, ParameterMode.IN);
			scheduledDatequery.registerStoredProcedureParameter(2, String.class, ParameterMode.IN);
			scheduledDatequery.setParameter(1, jobName);
			scheduledDatequery.setParameter(2, "nextScheduledDate");
			scheduledDatequery.execute();
			List<Object[]> resultSet = scheduledDatequery.getResultList();
			Object[] result = resultSet.get(0);

			long difference = 0;
			String nextScheduledAsFormatedDate = "";
			String nextScheduledTimeAsString = "";
			String nextScheduledDateAndTime = "";

//			Next Scheduled Date
			Object nextScheduledDate = result[15];
			if ((int) nextScheduledDate != 0) {
				SimpleDateFormat nextScheduledDateOriginalFormat = new SimpleDateFormat("yyyyMMdd");
				nextScheduledDateOriginalFormat.setTimeZone(TimeZone.getTimeZone("CST"));
				Date nextScheduledDateAsDate = nextScheduledDateOriginalFormat.parse(nextScheduledDate.toString());
				SimpleDateFormat newFormat = new SimpleDateFormat("MM/dd/yyyy");
				nextScheduledAsFormatedDate = newFormat.format(nextScheduledDateAsDate);
			}

//			Next Scheduled Time
			Object nextScheduledTime = result[16];
			if ((int) nextScheduledDate != 0) {
				SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");
				timeFormat.setTimeZone(TimeZone.getTimeZone("CST"));

				nextScheduledTimeAsString = nextScheduledTime.toString();
				String nextScheduledTimeInHours = nextScheduledTimeAsString.substring(0,
						nextScheduledTimeAsString.length() - 4);
				if (nextScheduledTimeInHours.length() == 1) {
					nextScheduledTimeInHours = "0" + nextScheduledTimeInHours;
				}
				String nextScheduledTimeInMinutes = nextScheduledTimeAsString
						.substring(nextScheduledTimeAsString.length() - 4, nextScheduledTimeAsString.length() - 2);
				String nextScheduledTimeInSeconds = nextScheduledTimeAsString
						.substring(nextScheduledTimeAsString.length() - 2, nextScheduledTimeAsString.length());
				nextScheduledTimeAsString = nextScheduledTimeInHours + ":" + nextScheduledTimeInMinutes + ":"
						+ nextScheduledTimeInSeconds;

//				Current CST Time
				Date currentTime = new Date();
				Date currentTimeDateObj = timeFormat.parse(timeFormat.format(currentTime).toString());
				Date nextScheduledDateObj = timeFormat.parse(nextScheduledTimeAsString);

//				Difference in time
				difference = nextScheduledDateObj.getTime() - currentTimeDateObj.getTime();
				difference = difference / 1000;
			}

//			Next Scheduled date and time 
			nextScheduledDateAndTime = nextScheduledAsFormatedDate + " " + nextScheduledTimeAsString;
			DateFormat df = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
			DateFormat outputformat = new SimpleDateFormat("MM/dd/yyyy, hh:mm:ss aa");
			Date nextScheduledDateAndTimeAsDate = df.parse(nextScheduledDateAndTime);
			String nextScheduledDateAndTimeAsString = outputformat.format(nextScheduledDateAndTimeAsDate);

			List<Object> jobDetail = new ArrayList<Object>();
			jobDetail.add(nextScheduledDateAndTimeAsString);
			jobDetail.add(difference);

			return jobDetail;
		} catch (Exception e) {
			return null;
		}
	}
}
