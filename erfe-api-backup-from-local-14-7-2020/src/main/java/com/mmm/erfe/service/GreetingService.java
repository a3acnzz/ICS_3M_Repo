package com.mmm.erfe.service;

import java.util.Collection;
import com.mmm.erfe.domain.Greeting;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * GreetingService implemented by GreetingServiceImpl
 * 
 * @author Rajkumar
 *
 */
public interface GreetingService {

	/**
	 * Displays all the greetings
	 * 
	 * @author RajKumar
	 * @param void
	 * @throws Nothing
	 * @return Collection of <Greeting>
	 */
	Collection<Greeting> findAll();

	/**
	 * Displays the greetings based on given id
	 * 
	 * @author RajKumar
	 * @param id
	 * @throws Nothing
	 * @return Greeting
	 */
	Greeting findOne(Long id);

	/**
	 * Creates the greeting
	 * 
	 * @author RajKumar
	 * @param greeting
	 * @throws Nothing
	 * @return Greeting
	 */
	Greeting create(Greeting greeting);

	/**
	 * Updates the greeting
	 * 
	 * @author RajKumar
	 * @param greeting
	 * @throws Nothing
	 * @return Greeting
	 */
	Greeting update(Greeting greeting);

	/**
	 * Deletes the greeting based on the given id
	 * 
	 * @author RajKumar
	 * @param id
	 * @throws Nothing
	 * @return void
	 */
	void delete(Long id);
}
