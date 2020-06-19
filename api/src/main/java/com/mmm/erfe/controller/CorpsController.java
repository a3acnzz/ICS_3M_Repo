package com.mmm.erfe.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mmm.erfe.domain.AccountMaster;
import com.mmm.erfe.domain.ActivityLog;
import com.mmm.erfe.domain.AllDocData;
import com.mmm.erfe.domain.ApproverDashboardResult;
import com.mmm.erfe.domain.ApproverMasterDetail;
import com.mmm.erfe.domain.CorpAttachment;
import com.mmm.erfe.domain.CorpPsRFE;
import com.mmm.erfe.domain.DepartmentMaster;
import com.mmm.erfe.domain.GlobalUser;
import com.mmm.erfe.domain.ProviderMaster;
import com.mmm.erfe.domain.RfeNumData;
import com.mmm.erfe.domain.SearchResult;
import com.mmm.erfe.domain.UserSearchResult;
import com.mmm.erfe.service.AccountMasterService;
import com.mmm.erfe.service.ActivityLogService;
import com.mmm.erfe.service.AllDocService;
import com.mmm.erfe.service.ApproverMasterDetailService;
import com.mmm.erfe.service.ApproverService;
import com.mmm.erfe.service.CorpsService;
import com.mmm.erfe.service.DepartmentMasterService;
import com.mmm.erfe.service.GlobalUserService;
import com.mmm.erfe.service.ProviderMasterService;
import com.mmm.erfe.service.SearchService;

import net.minidev.json.JSONObject;

/**
 * Rest end points of the application
 * 
 * @author Senthil
 * @author Rajkumar
 * @author Sowmya
 * 
 */
@RestController
public class CorpsController extends BaseController {
	/**
	 * Dynamic object creation
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return Object of CorpsService
	 *
	 */
	@Autowired
	CorpsService corpsService;
	/**
	 * Dynamic object creation
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return Object of AllDocService
	 *
	 */
	@Autowired
	AllDocService allDocService;
	/**
	 * Dynamic object creation
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return Object of SearchService
	 *
	 */
	@Autowired
	SearchService searchService;
	/**
	 * Dynamic object creation
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return Object of AccountMasterService
	 *
	 */
	@Autowired
	AccountMasterService accountMasterService;
	/**
	 * Dynamic object creation
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return Object of DepartmentMasterService
	 *
	 */
	@Autowired
	DepartmentMasterService departmentMasterService;
	/**
	 * Dynamic object creation
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return Object of ProviderMasterService
	 *
	 */
	@Autowired
	ProviderMasterService providerMasterService;
	/**
	 * Dynamic object creation
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return Object of GlobalUserService
	 *
	 */
	@Autowired
	GlobalUserService globalUserService;
	/**
	 * Dynamic object creation
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return Object of ApproverService
	 *
	 */
	@Autowired
	ApproverService approverService;
	/**
	 * Dynamic object creation
	 * 
	 * @author RajKumar
	 * @param void
	 * @throws Nothing
	 * @return Object of ActivityLogService
	 *
	 */
	@Autowired
	ActivityLogService activityService;
	/**
	 * Dynamic object creation
	 * 
	 * @author RajKumar
	 * @param void
	 * @throws Nothing
	 * @return Object of ApproverMasterDetailService
	 *
	 */
	@Autowired
	ApproverMasterDetailService approverDetailService;

	/**
	 * Search result controller for admin role
	 * 
	 * @author Senthil
	 * @param status-status of the form, order-date selection from front end,
	 *                      sort-Ascending/Descending selection from front end
	 * @throws Nothing
	 * @return Collection<SearchResult>, HttpStatus
	 * @throws JsonProcessingException
	 * @throws Exception
	 *
	 */
	@RequestMapping(value = "/searchCorps", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE, MediaType.TEXT_HTML_VALUE })
	public ResponseEntity<Collection<SearchResult>> getCorpPsRFEBy(@RequestParam("corpsSearch") String searchData,
			@RequestParam("order") String order, @RequestParam("sort") int sort) throws Exception {
		SearchResult searchResult = new ObjectMapper().readValue(searchData, SearchResult.class);
		System.out.println(searchResult.getStatus());
		Collection<SearchResult> searchResults = searchService.find(searchResult, order, sort);
		return new ResponseEntity<Collection<SearchResult>>(searchResults, HttpStatus.OK);
	}

	/**
	 * Search result controller for User role
	 * 
	 * @author Senthil
	 * @param status-status of the form, order-date selection from front end,
	 *                      sort-Ascending/Descending selection from front end,
	 *                      userId-userId from front end
	 * @throws Nothing
	 * @return Collection<SearchResult>, HttpStatus
	 * @throws JsonProcessingException
	 * @throws JsonMappingException
	 *
	 */
	@RequestMapping(value = "/searchCorps/user", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE, MediaType.TEXT_HTML_VALUE })
	public ResponseEntity<Collection<SearchResult>> getCorpPsRFEBy(@RequestParam("corpsSearch") String searchData,
			@RequestParam("order") String order, @RequestParam("sort") int sort, @RequestParam("userId") String userId)
			throws Exception {
		SearchResult searchResult = new ObjectMapper().readValue(searchData, SearchResult.class);
		System.out.println(searchResult.getStatus());
		Collection<SearchResult> searchResults = searchService.findByUser(searchResult, order, sort, userId);
		return new ResponseEntity<Collection<SearchResult>>(searchResults, HttpStatus.OK);
	}

	/**
	 * Insertion of data into database
	 * 
	 * @author Rajkumar, Sowmya
	 * @param corpPsRFEData-form data, files-attachments
	 * @throws Exception
	 * @return Saved data, HttpStatus
	 *
	 */

	@RequestMapping(value = "/saveCorps", method = RequestMethod.POST)
	public ResponseEntity<?> saveCorps(@RequestParam("corpRFEData") String corpPsRFEData,
			@RequestParam("uploadfile") MultipartFile[] files, @RequestParam("attachments") String attachment,
			@RequestParam("oldCorpReq") String oldCorpReq) throws Exception {

		CorpPsRFE corpPsRFE = new ObjectMapper().readValue(corpPsRFEData, CorpPsRFE.class);
		CorpAttachment attachments[] = new ObjectMapper().readValue(attachment, CorpAttachment[].class);
		StringBuffer st = new StringBuffer(oldCorpReq);
		st.deleteCharAt(0);
		st.deleteCharAt(st.length() - 1);

		CorpPsRFE savedCorpPsRFE = corpsService.createCorpPsRFE(corpPsRFE, files, attachments, st.toString());
		if (savedCorpPsRFE != null && savedCorpPsRFE.getDocId() != null) {
			return new ResponseEntity<>(String.valueOf(savedCorpPsRFE.getCorpPSReqNum()), HttpStatus.OK);
		} else {
			return new ResponseEntity<>("", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Get Corps data of PsRequest Number number
	 * 
	 * @author Rajkumar
	 * @param CorpPSReqNum-PsRequest Number
	 * @throws Nothing
	 * @return CorpPsRFE, HttpStatus
	 *
	 */
	@RequestMapping(value = "/getCorpsByPSReqNum", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE, MediaType.TEXT_HTML_VALUE })
	public ResponseEntity<Optional<CorpPsRFE>> getCorpsByPSReqNum(@RequestParam("CorpPSReqNum") String CorpPSReqNum) {

		Optional<CorpPsRFE> corpsPsRFE = corpsService.findByCorpPSReqNum(CorpPSReqNum);
		return new ResponseEntity<Optional<CorpPsRFE>>(corpsPsRFE, HttpStatus.OK);
	}

	/**
	 * Updates the data into the database
	 * 
	 * @author Senthil
	 * @param corpPsRFEData-form data, files-attachments
	 * @throws Exception
	 * @return updatedCorpPsRFE, HttpStatus
	 *
	 */
	@RequestMapping(value = "/updateCorps", method = RequestMethod.POST)
	public ResponseEntity<CorpPsRFE> updateCorps(@RequestParam("corpRFEData") String corpPsRFEData,
			@RequestParam("uploadfile") MultipartFile[] files) throws Exception {
		CorpPsRFE corpPsRFE = new ObjectMapper().readValue(corpPsRFEData, CorpPsRFE.class);
		CorpPsRFE updatedCorpPsRFE = corpsService.update(corpPsRFE, files);
		if (updatedCorpPsRFE == null) {
			return new ResponseEntity<CorpPsRFE>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<CorpPsRFE>(updatedCorpPsRFE, HttpStatus.OK);
	}

	/**
	 * Get all Corps data for approver lookup
	 * 
	 * @author Senthil
	 * @param approverPin-approver pin
	 * @throws Nothing
	 * @return Collection<ApproverDashboardResult>, HttpStatus
	 *
	 */
	@RequestMapping(value = "/getAllCorpPsRfeNum", method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<ApproverDashboardResult>> getAllCorpPsRfeNumberForApprover(
			@RequestParam("approverPin") String approverPin) {
		Collection<ApproverDashboardResult> getAllCorpPsRFENum = approverService
				.findAllCorpPsRfeNumForApprover(approverPin);
		if (getAllCorpPsRFENum == null) {
			return new ResponseEntity<Collection<ApproverDashboardResult>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Collection<ApproverDashboardResult>>(getAllCorpPsRFENum, HttpStatus.OK);
	}

	/**
	 * Get all document information
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return Collection<AllDocData>, HttpStatus
	 *
	 */
	@RequestMapping(value = "/allDocdetails", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE, MediaType.TEXT_HTML_VALUE })
	public ResponseEntity<Collection<AllDocData>> getdocDetails() {
		Collection<AllDocData> allRequests = allDocService.findAll();
		return new ResponseEntity<Collection<AllDocData>>(allRequests, HttpStatus.OK);
	}

	/**
	 * Get account master data for lookup
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return Collection<AccountMaster>, HttpStatus
	 *
	 */
	@RequestMapping(value = "/accountMaster", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE, MediaType.TEXT_HTML_VALUE })
	public ResponseEntity<Collection<AccountMaster>> getaccountMaster(@RequestParam("acc") String acc,
			@RequestParam("desc") String desc) {
		Collection<AccountMaster> accountMaster = accountMasterService.findAll(acc, desc);
		return new ResponseEntity<Collection<AccountMaster>>(accountMaster, HttpStatus.OK);
	}

	/**
	 * Get cost center master data for lookup
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return Collection<DepartmentMaster>, HttpStatus
	 *
	 */
	@RequestMapping(value = "/departmentMaster", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE, MediaType.TEXT_HTML_VALUE })
	public ResponseEntity<Collection<DepartmentMaster>> getdepartmentMaster(@RequestParam("cost") String cost,
			@RequestParam("costDesc") String costDesc) {
		Collection<DepartmentMaster> departmentMaster = departmentMasterService.findAll(cost, costDesc);
		return new ResponseEntity<Collection<DepartmentMaster>>(departmentMaster, HttpStatus.OK);
	}

	/**
	 * Get supplier data for lookup
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return Collection<ProviderMaster>, HttpStatus
	 *
	 */
	@RequestMapping(value = "/providerMaster", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE, MediaType.TEXT_HTML_VALUE })
	public ResponseEntity<Collection<ProviderMaster>> getProviderMaster(@RequestParam("base") String base,
			@RequestParam("supplierName") String supplierName) {

		if (supplierName.length() > 0) {
			if (supplierName.charAt(0) == '%' || supplierName.charAt(supplierName.length() - 1) == '%') {
				supplierName = supplierName.trim();
			} else {
				supplierName = "%" + supplierName.trim() + "%";
			}
		}
		Collection<ProviderMaster> providerMaster = providerMasterService.findAll(base, supplierName);
		return new ResponseEntity<Collection<ProviderMaster>>(providerMaster, HttpStatus.OK);
	}

	/**
	 * Get User data for lookup
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return Collection<GlobalUser>, HttpStatus
	 *
	 */
	@RequestMapping(value = "/globalUser", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE, MediaType.TEXT_HTML_VALUE })
	public ResponseEntity<Collection<GlobalUser>> getglobalUser(@RequestBody GlobalUser searchInput) {
		Collection<GlobalUser> globalUser = globalUserService.findAll(searchInput);

		return new ResponseEntity<Collection<GlobalUser>>(globalUser, HttpStatus.OK);
	}

	/**
	 * Get User data for approver lookup
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return Collection<GlobalUser>, HttpStatus
	 *
	 */
	@RequestMapping(value = "/getGlobalUserForApprovar", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE, MediaType.TEXT_HTML_VALUE })
	public ResponseEntity<Collection<GlobalUser>> getGlobalUserForApprovar(@RequestBody GlobalUser searchInput) {
		Collection<GlobalUser> globalUser = globalUserService.getGlobalUserForApprovar(searchInput);

		return new ResponseEntity<Collection<GlobalUser>>(globalUser, HttpStatus.OK);
	}

	@RequestMapping(value = "/getGlobalUserById", method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Optional<GlobalUser>> getGlobalUserById(@RequestParam("personId") String personId) {
		Optional<GlobalUser> globalUser = globalUserService.getGlobalUserById(personId);
		return new ResponseEntity<Optional<GlobalUser>>(globalUser, HttpStatus.OK);
	}

	@RequestMapping(value = "/getUsersByMulIds", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<GlobalUser>> getUsersByMulIds(@RequestBody String[] personId) {
		List<String> personIds = Arrays.asList(personId);

		Collection<GlobalUser> globalUser = globalUserService.getUsersByMulIds(personIds);
		return new ResponseEntity<Collection<GlobalUser>>(globalUser, HttpStatus.OK);
	}

	/**
	 * Get Activity log data for activity log
	 * 
	 * @author Rajkumar
	 * @param docId-document id
	 * @throws Nothing
	 * @return Collection<ActivityLog>, HttpStatus
	 *
	 */
	@RequestMapping(value = "/getActivityLog", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE, MediaType.TEXT_HTML_VALUE })
	public ResponseEntity<Collection<ActivityLog>> getActivityLog(@RequestParam("docId") int docId) {
		Collection<ActivityLog> retrivedActivityLog = activityService.findAllActivities(docId);
		if (retrivedActivityLog == null) {
			return new ResponseEntity<Collection<ActivityLog>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Collection<ActivityLog>>(retrivedActivityLog, HttpStatus.OK);
	}

	/**
	 * Get Approver details for approver limit check
	 * 
	 * @author Rajkumar
	 * @param personId-approver person id
	 * @throws Nothing
	 * @return Collection<ApproverMasterDetail>, HttpStatus
	 *
	 */
	@RequestMapping(value = "/getApproverDetails", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE, MediaType.TEXT_HTML_VALUE })
	public ResponseEntity<Optional<ApproverMasterDetail>> getApproverDetails(
			@RequestParam("personId") String personId) {
		Optional<ApproverMasterDetail> retrivedApproverDetail = approverDetailService
				.findApprovalAmountByPersonId(personId);
		return new ResponseEntity<Optional<ApproverMasterDetail>>(retrivedApproverDetail, HttpStatus.OK);
	}

	/**
	 * Get generated PS Request Number for a particular user
	 * 
	 * @author Senthil
	 * @param personId-user person id
	 * @throws Nothing
	 * @return Collection<RfeNumData>, HttpStatus
	 *
	 */
	@RequestMapping(value = "/getPsRfeNum", method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Optional<RfeNumData>> getCorpPsReqNum(@RequestParam("personId") String personId) {
		Optional<RfeNumData> corpReqNumData = corpsService.findByPersonId(personId);
		return new ResponseEntity<Optional<RfeNumData>>(corpReqNumData, HttpStatus.OK);
	}

	/**
	 * Deleting an attachment
	 * 
	 * @author Sowmya
	 * @param attachmentId-Attachment id
	 * @throws Nothing
	 * @return Integer-Deleted/Not Deleted, HttpStatus
	 *
	 */
	@RequestMapping(value = "attchmentfile/{attachmentId}", method = RequestMethod.GET)
	public ResponseEntity<?> deleteAttachmentFile(@PathVariable int attachmentId) {
		int flag = corpsService.deleteAttachmentFile(attachmentId);
		return new ResponseEntity<Integer>(flag, HttpStatus.OK);
	}

	/**
	 * Downloading an attachment
	 * 
	 * @author Sowmya
	 * @param corpPsRfeNum-Corp ps request number, fileName- Name of the file,
	 *                          request- current request
	 * @throws Nothing
	 * @return Requested file with its appropriate name on header
	 *
	 */
	@RequestMapping(value = "downloadAttachmentFile", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<Resource> downloadFile(@RequestParam("corpPsRfeNum") String corpPsRfeNum,
			@RequestParam("fileName") String fileName, HttpServletRequest request) {
		Resource file = corpsService.loadFile(corpPsRfeNum, fileName);
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(file.getFile().getAbsolutePath());
		} catch (IOException ex) {
			ex.printStackTrace();
		}

		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
				.body(file);
	}

	@RequestMapping(value = "/jobTrigger", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE, MediaType.TEXT_HTML_VALUE })
	public ResponseEntity<?> jobTrigger(@RequestBody String jobName) {
		if (jobName != null) {
			jobName = jobName.substring(1, jobName.length() - 1);
			boolean isJobtriggered = corpsService.jobTrigger(jobName);
			if (isJobtriggered) {
				return new ResponseEntity<>(isJobtriggered, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(isJobtriggered, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} else {
			return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "/jobHistory", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE, MediaType.TEXT_HTML_VALUE })
	public ResponseEntity<?> jobHistory(@RequestBody String jobName) {
		if (jobName != null) {
			jobName = jobName.substring(1, jobName.length() - 1);
			List<Object> jobDetails = corpsService.jobHistory(jobName);
			if (jobDetails.isEmpty()) {
				System.out.println("is empty");
				return new ResponseEntity<>(jobDetails, HttpStatus.INTERNAL_SERVER_ERROR);
			} else {
				System.out.println("sent to FE");
				return new ResponseEntity<>(jobDetails, HttpStatus.OK);
			}
		} else {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
