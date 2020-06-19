package com.mmm.erfe.service.impl;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmm.erfe.domain.AllDocData;
import com.mmm.erfe.repository.AllDocRepository;
import com.mmm.erfe.service.AllDocService;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * 
 * @author Rajkumar AllDocServiceImpl implements AllDocService Interface
 *
 */
@Service
public class AllDocServiceImpl implements AllDocService {
	@Autowired
	AllDocRepository allDocRepo;

	/**
	 * Displays all the data
	 * 
	 * @author Rajkumar
	 * @param docId
	 * @throws Nothing
	 * @return allRequests of Collection<AllDocData>
	 */
	@Override
	public Collection<AllDocData> findAll() {
		Collection<AllDocData> allRequests = allDocRepo.findAll();
		return allRequests;
	}

}
