package com.mmm.erfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.mmm.erfe.domain.RfeNumData;

/**
 * 
 * @author Senthil
 *
 */

/**
 * RfeNumDataRepository extends JpaRepository<RfeNumData, Integer>
 * 
 * @author Senthil
 *
 */
public interface RfeNumDataRepository extends JpaRepository<RfeNumData, String> {

	/**
	 * Query for displaying the RfeNumData based on given personId
	 * 
	 * @author Senthil
	 * @param personId
	 * @throws Nothing
	 * @return RfeNumData
	 */
	//RfeNumData findByPersonId(String personId);
	
    @Transactional
    @Modifying
    @Query(" UPDATE RfeNumData c set c.reqNum=:updNum where c.psIdentity=:psIdentity")
    int upDateRfeNum(@Param("updNum")String updNum,@Param("psIdentity")String ps);

}
