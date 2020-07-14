
package com.mmm.erfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mmm.erfe.domain.RenewalContact;

/**
 * 
 * @author Sowmya
 *
 */

/**
 * RenewalInfoRepository extends JpaRepository<RenewalContact, Integer>
 * 
 * @author Sowmya
 *
 */
@Repository
public interface RenewalInfoRepository extends JpaRepository<RenewalContact, Integer> {
	/**
	 * Query for displaying the Contact information in Renewal based on given rfeNum
	 * 
	 * @author Sowmya
	 * @param rfeNum
	 * @throws Nothing
	 * @return List of <RenewalContact>
	 */
	@Query("SELECT p FROM RenewalContact p WHERE p.rfeNo = :rfeNum")
	public List<RenewalContact> findByRfe(@Param("rfeNum") Integer rfeNum);
}
