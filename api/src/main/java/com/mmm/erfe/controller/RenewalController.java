package com.mmm.erfe.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mmm.erfe.domain.RenewalBasic;
import com.mmm.erfe.model.RenewalBasicModel;

import com.mmm.erfe.service.RenewalService;

/**
 * 
 * @author Sowmya
 *
 */

/**
 * @author Sowmya
 *
 */
@RestController
public class RenewalController {

	@Autowired
	RenewalService renewalMasterService;

	/**
	 * Displays the Renewal Data of appropriate RFE Number
	 * 
	 * @author Sowmya
	 * @param rfeNo-RFE Number
	 * @throws Nothing
	 * @return Collection<RenewalBasicModel>, HttpStatus
	 * 
	 */
	@RequestMapping(value = "/renewalBasic", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE, MediaType.TEXT_HTML_VALUE })
	public ResponseEntity<RenewalBasicModel> getRenewalMaster(@RequestParam("rfeNo") int rfeNo) {
		RenewalBasicModel renewalMaster = renewalMasterService.renewalMasterService(rfeNo);
		return new ResponseEntity<RenewalBasicModel>(renewalMaster, HttpStatus.OK);
	}

	/**
	 * Displays all the renewal data in renewal list
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return Collection<RenewalBasic>, HttpStatus
	 * 
	 */
	@RequestMapping(value = "/renewalBasicDashboard", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE, MediaType.TEXT_HTML_VALUE })
	public ResponseEntity<Collection<RenewalBasic>> getRenewalMaster() {
		Collection<RenewalBasic> renewalDashboard = renewalMasterService.findAll();
		return new ResponseEntity<Collection<RenewalBasic>>(renewalDashboard, HttpStatus.OK);
	}

	/**
	 * Search the renewal data based on RFE Number
	 * 
	 * @author Sowmya
	 * @param rfeNo-RFE Number
	 * @throws Nothing
	 * @return Boolean, HttpStatus
	 * 
	 */
	@RequestMapping(value = "/rfeNumberSearch", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE, MediaType.TEXT_HTML_VALUE })
	public ResponseEntity<Boolean> getRfeNumberForRenewal(@RequestParam("rfeNo") int rfeNo) {
		Boolean renewalRfeNumber = renewalMasterService.rfeNumberSearchForrenewal(rfeNo);
		return new ResponseEntity<Boolean>(renewalRfeNumber, HttpStatus.OK);
	}

}
