package com.mmm.erfe.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmm.erfe.domain.ApproverMasterDetail;
import com.mmm.erfe.repository.ApproverMasterDetailRepository;
import com.mmm.erfe.service.ApproverMasterDetailService;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * ApproverMasterDetailServiceImpl implements ApproverMasterDetailService
 * Interface
 * 
 * @author Rajkumar
 *
 */
@Service
public class ApproverMasterDetailServiceImpl implements ApproverMasterDetailService {

	@Autowired
	ApproverMasterDetailRepository approverMasterRepo;

	/**
	 * Displays the Approver Master Popup
	 * 
	 * @author RajKumar
	 * @param personId
	 * @throws nothing
	 * @return approver of Optional<ApproverMasterDetail>
	 */
	@Override
	public Optional<ApproverMasterDetail> findApprovalAmountByPersonId(String personId) {

		Optional<ApproverMasterDetail> approverDetails = approverMasterRepo.findByPersonId(personId);
		return approverDetails;
	}

}
