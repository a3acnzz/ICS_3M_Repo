package com.mmm.erfe.service;

import java.util.Collection;

import com.mmm.erfe.domain.ProviderMaster;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * ProviderMasterService implemented by ProviderMasterServiceImpl
 * 
 * @author Rajkumar
 *
 */
public interface ProviderMasterService {
	/**
	 * Displays the provider master popup
	 * 
	 * @author RajKumar
	 * @param void
	 * @throws Nothing
	 * @return Collection of <ProviderMaster>
	 */
	Collection<ProviderMaster> findAll(String base,String supplierName);
}
