package com.mmm.erfe.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mmm.erfe.domain.ApproverDashboardResult;

/**
 * 
 * @author Senthil
 *
 */

/**
 * ApproverDashBoardRepository extends JpaRepository<ApproverDashboardResult,
 * Integer>
 * 
 * @author Senthil
 *
 */
@Repository
public interface ApproverDashBoardRepository extends JpaRepository<ApproverDashboardResult, Integer> {
	/**
	 * Query for the recent 15 approval details on dashboard for the approver for
	 * the given approver pin
	 * 
	 * @author Senthil
	 * @param approverPin-Approver details
	 * @throws Nothing
	 * @return Collection<ApproverDashboardResult>
	 */
	@Query(value = "SELECT top 15 * FROM V_Dashboard_Result WHERE Approver_Pin = :approverPin ORDER BY Created_Date DESC", nativeQuery = true)
	public Collection<ApproverDashboardResult> findAllCorpPsRfeNumForApprover(@Param("approverPin") String approverPin);

}
