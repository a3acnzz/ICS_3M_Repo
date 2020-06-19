
package com.mmm.erfe.repository;
import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mmm.erfe.domain.ActivityLog;
import com.mmm.erfe.domain.RenewalAccount;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Integer> {
	
//	@Query("SELECT p FROM ActivityLog p WHERE p.docId = :docId")
//	public Collection<ActivityLog> findByDocId(int docId);

}
