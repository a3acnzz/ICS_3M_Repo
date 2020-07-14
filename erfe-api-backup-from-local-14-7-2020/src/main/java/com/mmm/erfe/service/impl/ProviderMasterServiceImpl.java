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

import com.mmm.erfe.domain.ProviderMaster;
import com.mmm.erfe.repository.ProviderMasterRepository;
import com.mmm.erfe.service.ProviderMasterService;

/**
 * 
 * @author Senthil
 *
 */

/**
 * ProviderMasterServiceImpl implements ProviderMasterService Interface
 * 
 * @author Senthil
 *
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)

public class ProviderMasterServiceImpl implements ProviderMasterService {

	@Autowired
	ProviderMasterRepository providerMasterRepository;

	/**
	 * Displays the provider master popup
	 * 
	 * @author RajKumar
	 * @param void
	 * @throws Nothing
	 * @return providerMaster of Collection<ProviderMaster>
	 **/
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public Collection<ProviderMaster> findAll(String base,String supplierName) {
		Collection<ProviderMaster> providerMaster = providerMasterRepository.findAll(new Specification<ProviderMaster>() {
			
			@Override
			public Predicate toPredicate(Root<ProviderMaster> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				List<Predicate> predicates=new ArrayList<>();
				if(!base.equals("")&& base!=null){
				predicates.add(criteriaBuilder.and(criteriaBuilder.like(root.get("providerId"), "%"+base+"%")));
				}
				if(supplierName!=""&&supplierName!=null)
					predicates.add(criteriaBuilder.and(criteriaBuilder.like(root.get("providerName"), supplierName)));
				
				predicates.add(criteriaBuilder.and(criteriaBuilder.equal(root.get("isActive"), "Yes")));
				return  criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
			}
		});
		return providerMaster;
	}

}
