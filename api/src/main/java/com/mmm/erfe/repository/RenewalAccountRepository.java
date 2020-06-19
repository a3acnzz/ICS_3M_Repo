
package com.mmm.erfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mmm.erfe.domain.RenewalAccount;

/**
 * 
 * @author Sowmya
 *
 */

/**
 * RenewalAccountRepository extends JpaRepository<RenewalAccount, Integer>
 * 
 * @author Sowmya
 *
 */
@Repository
public interface RenewalAccountRepository extends JpaRepository<RenewalAccount, Integer> {
	/**
	 * Query for displaying the Account information in Renewal based on given rfeNum
	 * 
	 * @author Sowmya
	 * @param rfeNum
	 * @throws Nothing
	 * @return List of <RenewalAccount>
	 */
	@Query("SELECT p FROM RenewalAccount p WHERE p.rfeNo = :rfeNum")
	public List<RenewalAccount> findByRfe(@Param("rfeNum") Integer rfeNum);
}
