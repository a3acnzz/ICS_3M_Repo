package com.mmm.erfe.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

/**
 * 
 * @author Rajkumar
 *
 */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mmm.erfe.domain.AccountMaster;
import com.mmm.erfe.domain.SearchResult;
import com.mmm.erfe.repository.AccountMasterRepository;
import com.mmm.erfe.service.AccountMasterService;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * 
 * @author Rajkumar AccountMasterServiceImpl class implements
 *         AccountMasterService Interface
 *
 */

@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)

public class AccountMasterServiceImpl implements AccountMasterService {

	@Autowired
	AccountMasterRepository accountMasterRepository;

	/**
	 * 
	 * Displays the Account Master popup
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return accountMaster of type Collection<AccountMaster>
	 * 
	 */

	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public Collection<AccountMaster> findAll(String acc ,String desc) {
		Collection<AccountMaster> accountMaster = accountMasterRepository.findAll(new Specification<AccountMaster>() {
			
			@Override
			public Predicate toPredicate(Root<AccountMaster> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				List<Predicate> predicates = new ArrayList<>();
				if(acc!=null && acc!="")
					predicates.add(criteriaBuilder.and(criteriaBuilder.like(root.get("accountId").as(String.class), "%"+acc+"%")));
				if(desc != null && desc!="")
					predicates.add(criteriaBuilder.and(criteriaBuilder.like(root.get("accountDesc"), "%"+desc+"%")));
				
				predicates.add(criteriaBuilder.and(criteriaBuilder.equal(root.get("isActive"), "Yes")));
				return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));

			}
		});
		return accountMaster;
	}

}
