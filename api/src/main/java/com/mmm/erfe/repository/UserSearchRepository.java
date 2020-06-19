package com.mmm.erfe.repository;

import java.util.Collection;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import com.mmm.erfe.domain.UserSearchResult;

/**
 * 
 * @author Senthil
 *
 */

/**
 * UserSearchRepository extends JpaRepository<UserSearchResult, Integer>
 * 
 * @author Senthil
 *
 */
public interface UserSearchRepository extends JpaRepository<UserSearchResult, Integer> {

	/**
	 * Query for displaying the SearchResult values
	 * 
	 * @author Senthil
	 * @param specification
	 * @throws Nothing
	 * @return Collection of<UserSearchResult
	 */
	Collection<UserSearchResult> findAll(Specification<UserSearchResult> specification);

}
