package com.mmm.erfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.mmm.erfe.domain.DepartmentMaster;

/**
 * 
 * @author Senthil
 *
 */

/**
 * DepartmentMasterRepository extends JpaRepository<DepartmentMaster, Integer>
 * 
 * @author Senthil
 * @param void
 * @throws Nothing
 * @return void
 *
 */
@Repository
public interface DepartmentMasterRepository extends JpaRepository<DepartmentMaster, Integer> ,JpaSpecificationExecutor<DepartmentMaster>{

}
