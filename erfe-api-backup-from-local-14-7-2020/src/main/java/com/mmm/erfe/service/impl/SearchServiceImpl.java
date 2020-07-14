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

import com.mmm.erfe.domain.SearchResult;
import com.mmm.erfe.domain.UserSearchResult;
import com.mmm.erfe.repository.SearchRepository;
import com.mmm.erfe.repository.UserSearchRepository;
import com.mmm.erfe.service.SearchService;

/**
 * 
 * @author Senthil
 *
 */

/**
 * SearchServiceImpl implements SearchService Interface
 * 
 * @author Senthil
 *
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class SearchServiceImpl implements SearchService {

	@Autowired
	SearchRepository searchRepository;

	@Autowired
	UserSearchRepository userSearchRepository;

	/**
	 * Search by given form values
	 * 
	 * @author Rajkumar
	 * @param status,order,sort
	 * @throws Nothing
	 * @return searchResults of Collection<SearchResult>
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public Collection<SearchResult> find(SearchResult searchData, String order, int sort) {
	
		Collection<SearchResult> searchResults = searchRepository.findAll(new Specification<SearchResult>() {

			@Override
			public Predicate toPredicate(Root<SearchResult> root, CriteriaQuery<?> query,
					CriteriaBuilder criteriaBuilder) {
				List<Predicate> predicates = new ArrayList<>();
			
				if(searchData.getCorpPSReqNum() != null && searchData.getCorpPSReqNum()!="")
				predicates.add(criteriaBuilder
						.and(criteriaBuilder.like(root.get("CorpPSReqNum"), "%" + searchData.getCorpPSReqNum() + "%")));
				if(searchData.getContactName() != null && searchData.getContactName()!="")
				predicates.add(criteriaBuilder
						.or(criteriaBuilder.like(root.get("contactName"), "%" + searchData.getContactName() + "%"),
								criteriaBuilder.like(root.get("requestorName"), "%" + searchData.getContactName() + "%"),
								criteriaBuilder.like(root.get("projectCoordinator"), "%" + searchData.getContactName() + "%"),
								criteriaBuilder.like(root.get("approverName"), "%" + searchData.getContactName() + "%"),
								criteriaBuilder.like(root.get("infoName"), "%" + searchData.getContactName() + "%")));
				if(searchData.getCostCenter()!=null && searchData.getCostCenter()!="")
				predicates.add(criteriaBuilder
						.and(criteriaBuilder.like(root.get("costCenter"), "%" + searchData.getCostCenter().trim() + "%")));
				if(searchData.getProjectDesc() !=null && searchData.getProjectDesc()!="")
				predicates.add(criteriaBuilder
						.and(criteriaBuilder.like(root.get("projectDesc"), "%" + searchData.getProjectDesc() + "%")));
				if(searchData.getSupplier() != null && searchData.getSupplier()!="")
				predicates.add(criteriaBuilder
						.and(criteriaBuilder.like(root.get("supplier"), "%" + searchData.getSupplier() + "%")));
				if(searchData.getProjectTitle() != null && searchData.getProjectTitle()!="")
				predicates.add(criteriaBuilder
						.and(criteriaBuilder.like(root.get("projectTitle"), "%" + searchData.getProjectTitle() + "%")));
				if(searchData.getWbs() != null && searchData.getWbs()!="")
				predicates.add(
						criteriaBuilder.and(criteriaBuilder.like(root.get("wbs"), "%" + searchData.getWbs() + "%")));
				if(searchData.getRfeNum()!=null)
					predicates.add(
							criteriaBuilder.and(criteriaBuilder.equal(root.get("rfeNum"),  searchData.getRfeNum())));
				if(searchData.getStatus()!="" &&  searchData.getStatus()!=null)
					predicates.add(
							criteriaBuilder.and(criteriaBuilder.equal(root.get("status"),searchData.getStatus())));

				if (order != null && order!= "") {
					if (sort == 1)
						query.orderBy(criteriaBuilder.desc(root.get(order)));
					else
						query.orderBy(criteriaBuilder.asc(root.get(order)));
				}

				return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
			}
		});
		return searchResults;
	}

	/**
	 * Displays User information by searching form values
	 * 
	 * @author Rajkumar
	 * @param status,order,sort,userId
	 * @throws Nothing
	 * @return searchResults of Collection<UserSearchResult>
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public Collection<SearchResult> findByUser(SearchResult searchData, String order, int sort, String userId) {

		Collection<SearchResult> searchResults = searchRepository
				.findAll(new Specification<SearchResult>() {
					@Override
					public Predicate toPredicate(Root<SearchResult> root, CriteriaQuery<?> query,
							CriteriaBuilder criteriaBuilder) {
						

						List<Predicate> predicates = new ArrayList<>();
						
						if(searchData.getCorpPSReqNum() != null && searchData.getCorpPSReqNum()!="")
							predicates.add(criteriaBuilder
									.and(criteriaBuilder.like(root.get("CorpPSReqNum"), "%" + searchData.getCorpPSReqNum() + "%")));
						if(searchData.getContactName()!= null && searchData.getContactName()!="")
							predicates.add(criteriaBuilder
									.or(criteriaBuilder.like(root.get("contactName"), "%" + searchData.getContactName() + "%"),
											criteriaBuilder.like(root.get("requestorName"), "%" + searchData.getContactName() + "%"),
											criteriaBuilder.like(root.get("projectCoordinator"), "%" + searchData.getContactName() + "%"),
											criteriaBuilder.like(root.get("approverName"), "%" + searchData.getContactName() + "%"),
											criteriaBuilder.like(root.get("infoName"), "%" + searchData.getContactName() + "%")));
							if(searchData.getCostCenter()!= null && searchData.getCostCenter()!="")
							predicates.add(criteriaBuilder
									.and(criteriaBuilder.like(root.get("costCenter"), "%" + searchData.getCostCenter().trim() + "%")));
							if(searchData.getProjectDesc()!= null && searchData.getProjectDesc()!="")
							predicates.add(criteriaBuilder
									.and(criteriaBuilder.like(root.get("projectDesc"), "%" + searchData.getProjectDesc() + "%")));
							if(searchData.getSupplier()!= null && searchData.getSupplier()!="")
							predicates.add(criteriaBuilder
									.and(criteriaBuilder.like(root.get("supplier"), "%" + searchData.getSupplier() + "%")));
							if(searchData.getProjectTitle()!= null && searchData.getProjectTitle()!="")
							predicates.add(criteriaBuilder
									.and(criteriaBuilder.like(root.get("projectTitle"), "%" + searchData.getProjectTitle() + "%")));
							if(searchData.getWbs()!= null && searchData.getWbs()!="")
							predicates.add(
									criteriaBuilder.and(criteriaBuilder.like(root.get("wbs"), "%" + searchData.getWbs() + "%")));
							if(searchData.getRfeNum()!=null)
								predicates.add(
										criteriaBuilder.and(criteriaBuilder.equal(root.get("rfeNum"),  searchData.getRfeNum())));
							if(searchData.getStatus()!="" &&  searchData.getStatus()!=null)
								predicates.add(
										criteriaBuilder.and(criteriaBuilder.equal(root.get("status"),searchData.getStatus())));
							
							if (userId != null) {
								predicates.add(
									criteriaBuilder.or(criteriaBuilder.and(
										criteriaBuilder.or(criteriaBuilder.like(root.get("approverId"), "%" + userId + "%"),
										criteriaBuilder.equal(root.get("siteContactPin"), userId),
										criteriaBuilder.equal(root.get("projectCoordinatorId"), userId),
										criteriaBuilder.like(root.get("informationPersonId"), "%" + userId + "%")),
										criteriaBuilder.notEqual(root.get("status"), "Not Submitted")),
											criteriaBuilder.equal(root.get("createdPerson"), userId)));
							} 
						if (order != null && order!= "") {
							if (sort == 1)
								query.orderBy(criteriaBuilder.desc(root.get(order)));
							else
								query.orderBy(criteriaBuilder.asc(root.get(order)));
						}

						return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
					}

				});
		return searchResults;
	}

}
