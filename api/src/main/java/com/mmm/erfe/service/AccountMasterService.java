package com.mmm.erfe.service;

import java.util.Collection;

import com.mmm.erfe.domain.AccountMaster;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * AccountMasterService Interface implemented by AccountMasterServiceImpl
 * 
 * @author Rajkumar
 * 
 */

public interface AccountMasterService {

	/**
	 * Displays the Account Master popup
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return Collection of AccountMaster
	 *
	 */

	Collection<AccountMaster> findAll(String acc ,String desc);

}
