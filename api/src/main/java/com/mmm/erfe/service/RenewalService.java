package com.mmm.erfe.service;

import java.util.Collection;

import com.mmm.erfe.domain.RenewalBasic;
import com.mmm.erfe.model.RenewalBasicModel;

/**
 * 
 * @author Sowmya
 *
 */

/**
 * RenewalService implemented by RenewalServiceImpl
 * 
 * @author Rajkumar
 *
 */
public interface RenewalService {
	/**
	 * Displays all the Renewal Data in the dashboard
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return Collection of <RenewalBasic>
	 */
	Collection<RenewalBasic> findAll();

	/**
	 * Displays the Renewal Data
	 * 
	 * @author Rajkumar
	 * @param rfeNo
	 * @throws Nothing
	 * @return RenewalBasicModel
	 */
	public RenewalBasicModel renewalMasterService(int rfeNo);

	/**
	 * Search the renewal data based on Rfe Number
	 * 
	 * @author Rajkumar
	 * @param rfeNo
	 * @throws Nothing
	 * @return Boolean
	 */
	public Boolean rfeNumberSearchForrenewal(int rfeNo);

}
