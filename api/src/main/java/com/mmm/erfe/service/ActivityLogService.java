package com.mmm.erfe.service;

import java.util.Collection;
import com.mmm.erfe.domain.ActivityLog;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * ActivityLogService Interface implemented by ActivityLogService
 * 
 * @author Rajkumar
 * 
 */

public interface ActivityLogService {
	/**
	 * Displays the Activity Logs based on docID
	 * 
	 * @author RajKumar
	 * @param docId
	 * @throws Nothing
	 * @return Collection of <ActivityLog>
	 *
	 */
	Collection<ActivityLog> findAllActivities(int docId);

}
