package com.mmm.erfe.repository;

import com.mmm.erfe.domain.CorpPsRFE;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 
 * @author Senthil
 *
 */

/**
 * CorpsRepository extends JpaRepository<CorpPsRFE, Integer>
 * 
 * @author Senthil
 *
 */
@Repository
public interface CorpsRepository extends JpaRepository<CorpPsRFE, Integer> {

	/**
	 * Query for searching CorpPsRFE values based on given id
	 * 
	 * @author Senthil
	 * @param id
	 * @throws Nothing
	 * @return Optional of <CorpPsRFE>
	 */
	Optional<CorpPsRFE> findByDocId(Integer id);

	/**
	 * Query for searching CorpPsRFE values based on given corpPSReqNum
	 * 
	 * @author Senthil
	 * @param corpPSReqNum
	 * @throws Nothing
	 * @return Optional of <CorpPsRFE>
	 */
	Optional<CorpPsRFE> findByCorpPSReqNum(String corpPSReqNum);

}
