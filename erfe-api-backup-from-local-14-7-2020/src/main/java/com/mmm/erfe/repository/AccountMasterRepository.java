package com.mmm.erfe.repository;

import java.util.Collection;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.mmm.erfe.domain.AccountMaster;
import com.mmm.erfe.domain.SearchResult;

/**
 * 
 * @author Senthil
 *
 */

/**
 * AccountMasterRepository extends JpaRepository<AccountMaster, Integer>
 * 
 * @author Senthil
 *
 */
@Repository
public interface AccountMasterRepository extends JpaRepository<AccountMaster, Integer>,JpaSpecificationExecutor<AccountMaster> {


}
