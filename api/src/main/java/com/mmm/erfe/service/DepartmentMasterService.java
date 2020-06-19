package com.mmm.erfe.service;

import java.util.Collection;

import com.mmm.erfe.domain.DepartmentMaster;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * DepartmentMasterService implemented by DepartmentMasterServiceImpl
 * 
 * @author Rajkumar
 *
 */
public interface DepartmentMasterService {
	/**
	 * Displays the Department Master Popup
	 * 
	 * @author RajKumar
	 * @param void
	 * @throws Nothing
	 * @return Collection of <DepartmentMaster>
	 */
	Collection<DepartmentMaster> findAll(String cost,String costDesc);
}
