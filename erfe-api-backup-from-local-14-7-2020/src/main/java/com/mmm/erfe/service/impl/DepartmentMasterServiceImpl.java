package com.mmm.erfe.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mmm.erfe.domain.DepartmentMaster;
import com.mmm.erfe.domain.SearchResult;
import com.mmm.erfe.repository.DepartmentMasterRepository;
import com.mmm.erfe.service.DepartmentMasterService;

/**
 * 
 * @author Senthil
 *
 */

/**
 * DepartmentMasterServiceImpl implements DepartmentMasterService Interface
 * 
 * @author Senthil
 *
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)

public class DepartmentMasterServiceImpl implements DepartmentMasterService {

	@Autowired
	DepartmentMasterRepository departmentMasterRepository;

	/**
	 * Displays the Department Master Popup
	 * 
	 * @author RajKumar
	 * @param void
	 * @throws Nothing
	 * @return departmentMaster of Collection<DepartmentMaster>
	 */
	@Override
	public Collection<DepartmentMaster> findAll(String cost,String costDesc) {
		Collection<DepartmentMaster> departmentMaster = departmentMasterRepository.findAll(new Specification<DepartmentMaster>() {

			@Override
			public Predicate toPredicate(Root<DepartmentMaster> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				
				List<Predicate> predicates = new ArrayList<>();
				if(cost != null &&cost!="")
					predicates.add(criteriaBuilder.and(criteriaBuilder.like(root.get("departmentId").as(String.class), "%"+cost+"%")));
				if(costDesc != null && costDesc!="")
					predicates.add(criteriaBuilder.and(criteriaBuilder.like(root.get("departmentDesc"), "%"+costDesc+"%")));
				
				predicates.add(criteriaBuilder.and(criteriaBuilder.equal(root.get("isActive"), "Yes")));
				return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));

			}
			
			
			
		});
		
		return departmentMaster;
	}

}
