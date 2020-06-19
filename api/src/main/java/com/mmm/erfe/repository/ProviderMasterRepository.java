package com.mmm.erfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.mmm.erfe.domain.ProviderMaster;

/**
 * 
 * @author Senthil
 *
 */

/**
 * ProviderMasterRepository extends JpaRepository<ProviderMaster, Integer>
 * 
 * @author Senthil
 * @param void
 * @throws Nothing
 * @return void
 *
 */
@Repository
public interface ProviderMasterRepository extends JpaRepository<ProviderMaster, Integer>,JpaSpecificationExecutor<ProviderMaster> {

}
