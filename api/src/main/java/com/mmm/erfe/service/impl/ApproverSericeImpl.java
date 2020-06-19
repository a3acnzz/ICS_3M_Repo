package com.mmm.erfe.service.impl;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmm.erfe.domain.ApproverDashboardResult;
import com.mmm.erfe.repository.ApproverDashBoardRepository;
import com.mmm.erfe.service.ApproverService;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * ApproverSericeImpl implements ApproverService Interface
 * 
 * @author Rajkumar
 *
 */
@Service
public class ApproverSericeImpl implements ApproverService {
	@Autowired
	ApproverDashBoardRepository approverDashRepo;

	/**
	 * Displays the Approver details based on Approver Pin
	 * 
	 * @author RajKumar
	 * @param approverPin
	 * @throws nothing
	 * @return allRequests of Collection<ApproverDashboardResult>
	 */
	@Override
	public Collection<ApproverDashboardResult> findAllCorpPsRfeNumForApprover(String approverPin) {
		Collection<ApproverDashboardResult> allRequests = approverDashRepo.findAllCorpPsRfeNumForApprover(approverPin);
		return allRequests;
	}
}
