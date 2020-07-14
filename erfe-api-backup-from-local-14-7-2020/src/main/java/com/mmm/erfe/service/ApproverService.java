package com.mmm.erfe.service;

import java.util.Collection;

import com.mmm.erfe.domain.ApproverDashboardResult;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * ApproverService Interface implemented by ApproverServiceImpl
 * 
 * @author Rajkumar
 *
 */
public interface ApproverService {

	/**
	 * Displays the Approver details based on Approver Pin
	 * 
	 * @author RajKumar
	 * @param approverPin
	 * @throws Nothing
	 * @return Collection of <ApproverDashboardResult>
	 *
	 */
	Collection<ApproverDashboardResult> findAllCorpPsRfeNumForApprover(String approverPin);

}
