package com.mmm.erfe.service.impl;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.mmm.erfe.domain.GlobalUser;
import com.mmm.erfe.repository.GlobalUserRepository;
import com.mmm.erfe.service.GlobalUserService;

@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)

/**
 * 
 * @author RajKumar
 *
 */

/**
 * GlobalUserServiceImpl implements GlobalUserService Interface
 * 
 * @author RajKumar
 *
 */
public class GlobalUserServiceImpl implements GlobalUserService {
	@Autowired
	GlobalUserRepository globalUserRepository;

	/**
	 * Displays the User's common form popup
	 * 
	 * @author RajKumar
	 * @param void
	 * @throws Nothing
	 * @return globalUser of Collection<GlobalUser>
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public Collection<GlobalUser> findAll(GlobalUser searchInput) {
	Collection<GlobalUser> globalUser;
	if ((searchInput.getPersonId() != null && searchInput.getPersonId() != "")
	|| (searchInput.getPersonLastName() != null && searchInput.getPersonLastName() != "")
	|| (searchInput.getPersonFirstName() != null && searchInput.getPersonFirstName() != "")
	|| (searchInput.getUserPin() != null && searchInput.getUserPin() != "")) {

	globalUser = globalUserRepository.find(searchInput.getPersonId(), searchInput.getUserPin(),
	searchInput.getPersonFirstName(), searchInput.getPersonLastName());

	} else {
	globalUser = globalUserRepository.findAll();
	}
	return globalUser;
	}

	/**
	 * Displays the User's common form popup for approval
	 * 
	 * @author RajKumar
	 * @param void
	 * @throws Nothing
	 * @return result of Collection<GlobalUser>
	 **/
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public Collection<GlobalUser> getGlobalUserForApprovar(GlobalUser searchInput) {
	Collection<GlobalUser> globalUser;
	if ((searchInput.getPersonId() != null && searchInput.getPersonId() != "")
	|| (searchInput.getPersonLastName() != null && searchInput.getPersonLastName() != "")
	|| (searchInput.getPersonFirstName() != null && searchInput.getPersonFirstName() != "")
	|| (searchInput.getUserPin() != null && searchInput.getUserPin() != "")) {

	globalUser = globalUserRepository.getGlobalUserForApprovar(searchInput.getPersonId(),
	searchInput.getUserPin(), searchInput.getPersonFirstName(), searchInput.getPersonLastName());

	} else {
	globalUser = globalUserRepository.getAllGlobalUserForApprovar();
	}
	return globalUser;
	}

	@Override
	public Optional<GlobalUser> getGlobalUserById(String personId) {
		Optional<GlobalUser> user=globalUserRepository.findById(personId);
		return user;
	}

	@Override
	public Collection<GlobalUser> getUsersByMulIds(List<String> personId) {
	
		Collection<GlobalUser> globalUser = globalUserRepository.findByInventoryIdIn(personId);
		return globalUser;
	}
}