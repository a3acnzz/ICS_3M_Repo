package com.mmm.erfe.service;

import java.util.Collection;

import com.mmm.erfe.domain.SearchResult;
import com.mmm.erfe.domain.UserSearchResult;

/**
 * 
 * @author Senthil
 *
 */

/**
 * SearchService implemented by SearchServiceImpl
 * 
 * @author Rajkumar
 *
 */
public interface SearchService {
	/**
	 * Search by given form values
	 * 
	 * @author Rajkumar
	 * @param status,order,sort
	 * @throws Nothing
	 * @return Collection of <SearchResult>
	 */
	Collection<SearchResult> find(SearchResult searchData, String order, int sort);

	/**
	 * Displays User information by searching form values
	 * 
	 * @author Rajkumar
	 * @param status,order,sort,userId
	 * @throws Nothing
	 * @return Collection of <UserSearchResult>
	 */
	Collection<SearchResult> findByUser(SearchResult searchData, String order, int sort, String userId);
}
