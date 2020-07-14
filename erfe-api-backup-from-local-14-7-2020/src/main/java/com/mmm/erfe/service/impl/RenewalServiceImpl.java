package com.mmm.erfe.service.impl;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmm.erfe.domain.RenewalAccount;
import com.mmm.erfe.domain.RenewalBasic;
import com.mmm.erfe.domain.RenewalContact;
import com.mmm.erfe.domain.RenewalWorker;
import com.mmm.erfe.model.RenewalBasicModel;
import com.mmm.erfe.repository.RenewalAccountRepository;
import com.mmm.erfe.repository.RenewalInfoRepository;
import com.mmm.erfe.repository.RenewalMasterRepository;
import com.mmm.erfe.repository.RenewalWorkerRepository;
import com.mmm.erfe.service.RenewalService;

/**
 * 
 * @author Sowmya
 *
 */

/**
 * RenewalServiceImpl implements RenewalService Interface
 * 
 * @author Sowmya
 *
 */
@Service
public class RenewalServiceImpl implements RenewalService {
	@Autowired
	RenewalMasterRepository renewalRepo;
	@Autowired
	RenewalWorkerRepository renewalWorkerRepo;
	@Autowired
	RenewalAccountRepository renewalAcctRepo;
	@Autowired
	RenewalInfoRepository renewalInfoRepo;

	/**
	 * Displays all the Renewal Data in the dashboard
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return renewRequests of Collection<RenewalBasic>
	 **/
	@Override
	public Collection<RenewalBasic> findAll() {
		Collection<RenewalBasic> renewRequests = renewalRepo.findAll();
		return renewRequests;
	}

	/**
	 * Displays the Renewal Data
	 * 
	 * @author Rajkumar
	 * @param rfeNo
	 * @throws Nothing
	 * @return renewal of class RenewalBasicModel
	 **/
	@Override
	public RenewalBasicModel renewalMasterService(int rfeNo) {

		Optional<RenewalBasic> renewalResult = renewalRepo.findByRfe(rfeNo);
		List<RenewalWorker> renewalWorkerResult = renewalWorkerRepo.findByRfe(rfeNo);
		List<RenewalAccount> renewalAccountResult = renewalAcctRepo.findByRfe(rfeNo);
		List<RenewalContact> renewalInfoResult = renewalInfoRepo.findByRfe(rfeNo);

		if (renewalResult.isPresent()) {
			RenewalBasic renewalObj = renewalResult.get();
			List<RenewalWorker> renewalWorkObj = renewalWorkerResult;
			List<RenewalAccount> renewalAcctObj = renewalAccountResult;
			List<RenewalContact> renewalInfoObj = renewalInfoResult;

			RenewalBasicModel renewal = new RenewalBasicModel();

			renewal.setProjectTitleM(renewalObj.getProjectTitle());
			renewal.setApprovalAmtM(renewalObj.getApprovalAmt());
			renewal.setAdditionalExpM(renewalObj.getAdditionalExp());
			renewal.setCompletionDateM(renewalObj.getCompletionDate());
			renewal.setStartDateM(renewalObj.getStartDate());
			renewal.setDescriptionM(renewalObj.getDescription());
			renewal.setHourlyM(renewalObj.getHourly());
			renewal.setFixedM(renewalObj.getFixed());
			renewal.setSupplierNameM(renewalObj.getSupplierName());
			renewal.setSupplierNumberM(renewalObj.getSupplierNumber());

			renewal.setWorkerDetails(renewalWorkObj);
			renewal.setAccountDetails(renewalAcctObj);
			renewal.setInfoDetails(renewalInfoObj);

			return renewal;

		} else {
			return null;
		}

	}

	/**
	 * Search the renewal data based on Rfe Number
	 * 
	 * @author Rajkumar
	 * @param rfeNo
	 * @throws Nothing
	 * @return boolean value
	 */
	@Override
	public Boolean rfeNumberSearchForrenewal(int rfeNo) {
		Optional<RenewalBasic> renewalResult = renewalRepo.findByRfe(rfeNo);
		if (renewalResult.isPresent()) {
			return true;
		} else {
			return false;
		}
	}
}
