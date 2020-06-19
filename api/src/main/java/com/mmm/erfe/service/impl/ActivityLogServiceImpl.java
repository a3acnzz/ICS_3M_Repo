package com.mmm.erfe.service.impl;

import java.util.Collection;

import org.springframework.stereotype.Service;

import com.mmm.erfe.domain.ActivityLog;
import com.mmm.erfe.service.ActivityLogService;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * 
 * ActivityLogServiceImpl implements ActivityLogService Interface
 * 
 * @author Rajkumar
 *
 */
@Service
public class ActivityLogServiceImpl implements ActivityLogService {

	/**
	 * Displays the Activity Logs based on docID
	 * 
	 * @author Rajkumar
	 * @param docId
	 * @throws Nothing
	 * @return null
	 * 
	 */
	@Override
	public Collection<ActivityLog> findAllActivities(int docId) {
		return null;
	}

}
