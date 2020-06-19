package com.mmm.erfe.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mmm.erfe.domain.ApproverMasterDetail;

/**
 * 
 * @author Senthil
 *
 */

/**
 * ApproverMasterDetailRepository extends JpaRepository<ApproverMasterDetail,
 * Integer>
 * 
 * @author Senthil
 *
 */
@Repository
public interface ApproverMasterDetailRepository extends JpaRepository<ApproverMasterDetail, Integer> {
	/**
	 * Query for the Approver information based on given personId
	 * 
	 * @author Senthil
	 * @param personId-user details
	 * @throws Nothing
	 * @return Optional<ApproverMasterDetail>
	 */
	@Query("SELECT p FROM ApproverMasterDetail p WHERE p.personId = :personId")
	public Optional<ApproverMasterDetail> findByPersonId(@Param("personId") String personId);

}
