package com.mmm.erfe.service.impl;

import com.mmm.erfe.service.GreetingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mmm.erfe.domain.Greeting;
import com.mmm.erfe.repository.GreetingRepository;

import org.springframework.transaction.annotation.Propagation;

import java.util.Collection;
import java.util.Optional;

import javax.persistence.EntityExistsException;
import javax.persistence.NoResultException;

/**
 * 
 * @author Senthil
 *
 */

/**
 * GrettingServiceImpl implements GreetingService
 * 
 * @author Senthil
 *
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class GrettingServiceImpl implements GreetingService {

	@Autowired
	GreetingRepository greetingRepository;

	/**
	 * Displays all the greetings
	 * 
	 * @author RajKumar
	 * @param void
	 * @throws Nothing
	 * @return greetings of Collection<Greeting>
	 */
	@Override
	public Collection<Greeting> findAll() {
		Collection<Greeting> greetings = greetingRepository.findAll();
		return greetings;
	}

	/**
	 * Displays the greetings based on given id
	 * 
	 * @author RajKumar
	 * @param id
	 * @throws Nothing
	 * @return greet of Optional<Greeting>
	 */
	@Override
	public Greeting findOne(Long id) {
		Optional<Greeting> greeting = greetingRepository.findById(id);
		Greeting greet = greeting.get();
		return greet;
	}

	/**
	 * Creates the greeting
	 * 
	 * @author RajKumar
	 * @param greeting
	 * @throws EntityExistsException
	 * @return savedGreeting of class Greeting
	 **/
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public Greeting create(Greeting greeting) {
		if (greeting.getId() != null) {
			throw new EntityExistsException("The id attribute must be null to persist a new entity.");
		}
		Greeting savedGreeting = greetingRepository.save(greeting);
		return savedGreeting;
	}

	/**
	 * Updates the greeting
	 * 
	 * @author RajKumar
	 * @param greeting
	 * @throws NoResultException
	 * @return updatedGreeting of class Greeting
	 **/
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public Greeting update(Greeting greeting) {
		Greeting greetingToUpdate = findOne(greeting.getId());
		if (greetingToUpdate == null) {
			throw new NoResultException("Requested entity not found.");
		}
		greetingToUpdate.setText(greeting.getText());
		Greeting updatedGreeting = greetingRepository.save(greetingToUpdate);
		return updatedGreeting;
	}

	/**
	 * Deletes the greeting based on the given id
	 * 
	 * @author RajKumar
	 * @param id
	 * @throws Nothing
	 * @return void
	 **/
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void delete(Long id) {
		greetingRepository.deleteById(id);
	}

}
