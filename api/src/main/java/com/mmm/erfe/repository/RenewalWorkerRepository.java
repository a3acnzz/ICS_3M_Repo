package com.mmm.erfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mmm.erfe.domain.RenewalWorker;

/**
 * 
 * @author Sowmya
 *
 */

/**
 * RenewalWorkerRepository extends JpaRepository<RenewalWorker, Integer>
 * 
 * @author Sowmya
 *
 */
@Repository
public interface RenewalWorkerRepository extends JpaRepository<RenewalWorker, Integer> {

	/**
	 * Query for displaying the Worker Information in Renewal based on given rfeNum
	 * 
	 * @author Sowmya
	 * @param rfeNum
	 * @throws Nothing
	 * @return List of <RenewalWorker>
	 */
	@Query("SELECT p FROM RenewalWorker p WHERE p.rfeNo = :rfeNum")
	public List<RenewalWorker> findByRfe(@Param("rfeNum") Integer rfeNum);
}
