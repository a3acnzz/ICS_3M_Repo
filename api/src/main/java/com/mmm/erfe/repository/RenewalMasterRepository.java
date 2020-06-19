
package com.mmm.erfe.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mmm.erfe.domain.RenewalBasic;

/**
 * 
 * @author Sowmya
 *
 */

/**
 * RenewalMasterRepository extends JpaRepository<RenewalBasic, Integer>
 * 
 * @author Sowmya
 *
 */
@Repository
public interface RenewalMasterRepository extends JpaRepository<RenewalBasic, Integer> {

	/**
	 * Query for displaying the Renewal information based on given rfeNum
	 * 
	 * @author Sowmya
	 * @param rfeNum
	 * @throws Nothing
	 * @return Optional of <RenewalBasic>
	 */
	@Query("SELECT p FROM RenewalBasic p WHERE p.rfeNo = :rfeNum")
	public Optional<RenewalBasic> findByRfe(@Param("rfeNum") Integer rfeNum);

}
