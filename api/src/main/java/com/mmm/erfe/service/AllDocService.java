package com.mmm.erfe.service;

import java.util.Collection;

import com.mmm.erfe.domain.ActivityLog;
import com.mmm.erfe.domain.AllDocData;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * AllDocService Interface implemented by AllDocServiceImpl
 * 
 * @author Rajkumar
 */

public interface AllDocService {
	/**
	 * Displays all the data
	 * 
	 * @author RajKumar
	 * @param void
	 * @throws Nothing
	 * @return Collection of <ActivityLog>
	 *
	 */
	Collection<AllDocData> findAll();

}
