package com.mmm.erfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mmm.erfe.domain.SearchResult;

/**
 * 
 * @author Senthil
 *
 */

/**
 * SearchRepository extends JpaRepository<SearchResult,
 * Integer>,JpaSpecificationExecutor<SearchResult>
 * 
 * @author Senthil
 *
 */
@Repository
public interface SearchRepository extends JpaRepository<SearchResult, Integer>, JpaSpecificationExecutor<SearchResult> {
	/**
	 * Query for getting the searchResult values
	 * 
	 * @author Senthil
	 * @param status
	 * @throws Nothing
	 * @return List of <SearchResult>
	 */
	@Query("SELECT p FROM SearchResult p WHERE p.status = :status")
	public List<SearchResult> find(@Param("status") String status);
}
