package com.mmm.erfe.service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import com.mmm.erfe.domain.GlobalUser;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * GlobalUserService implemented by GlobalUserServiceImpl
 * 
 * @author Rajkumar
 *
 */
public interface GlobalUserService {
	/**
	 * Displays the User's common form popup
	 * 
	 * @author RajKumar
	 * @throws nothing
	 * @param void
	 * @return Collection of <GlobalUser>
	 */
	Collection<GlobalUser> findAll(GlobalUser searchInput);

	/**
	 * Displays the User's common form popup for approval
	 * 
	 * @author RajKumar
	 * @throws nothing
	 * @param void
	 * @return Collection of <GlobalUser>
	 */
	Collection<GlobalUser> getGlobalUserForApprovar(GlobalUser searchInput);
	Optional<GlobalUser> getGlobalUserById(String personId);
	Collection<GlobalUser> getUsersByMulIds(List<String> personId);
}
