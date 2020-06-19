package com.mmm.erfe.service;

import java.util.Optional;

import com.mmm.erfe.domain.ApproverMasterDetail;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * 
 * ApproverMasterDetailService Interface implemented by
 * ApproverMasterDetailServiceImpl
 * 
 * @author Rajkumar
 *
 */

public interface ApproverMasterDetailService {
	/**
	 * Displays the Approver Master Popup
	 * 
	 * @author RajKumar
	 * @param personId
	 * @throws Nothing
	 * @return ApproverMasterDetail
	 */
	public Optional<ApproverMasterDetail> findApprovalAmountByPersonId(String personId);

}
