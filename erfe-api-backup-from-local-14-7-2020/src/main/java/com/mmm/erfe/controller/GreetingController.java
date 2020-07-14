package com.mmm.erfe.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mmm.erfe.domain.Greeting;
import com.mmm.erfe.service.GreetingService;

/**
 * 
 * @author Senthil
 *
 */

/**
 * @author Senthil
 *
 */
@RestController
public class GreetingController extends BaseController {

	@Autowired
	GreetingService greetingService;

	/**
	 * Displays all the greetings
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return Collection<Greeting>, HttpStatus
	 * 
	 */
	@RequestMapping(value = "/greetings", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE, MediaType.TEXT_HTML_VALUE })
	public ResponseEntity<Collection<Greeting>> getGreetings() {
		Collection<Greeting> greetings = greetingService.findAll();
		return new ResponseEntity<Collection<Greeting>>(greetings, HttpStatus.OK);
	}

	/**
	 * Displays the greetings based on given id
	 * 
	 * @author Senthil
	 * @param id-User id
	 * @throws Nothing
	 * @return Collection<Greeting>, HttpStatus
	 * 
	 */
	@RequestMapping(value = "/greetings/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Greeting> getGreeting(@PathVariable("id") Long id) {
		Greeting greeting = greetingService.findOne(id);
		if (greeting == null) {
			return new ResponseEntity<Greeting>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Greeting>(greeting, HttpStatus.OK);
	}

	/**
	 * Creates the greeting
	 * 
	 * @author Senthil
	 * @param greeting-User id and the text
	 * @throws Nothing
	 * @return Collection<Greeting>, HttpStatus
	 * 
	 */
	@RequestMapping(value = "/greetings", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Greeting> createGreeting(@RequestBody Greeting greeting) {
		Greeting savedGreeting = greetingService.create(greeting);
		return new ResponseEntity<Greeting>(savedGreeting, HttpStatus.CREATED);
	}

	/**
	 * Updates the greeting
	 * 
	 * @author Senthil
	 * @param greeting-User id and the text
	 * @throws Nothing
	 * @return Collection<Greeting>, HttpStatus
	 * 
	 */
	@RequestMapping(value = "/greetings/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Greeting> updateGreeting(@RequestBody Greeting greeting) {
		Greeting updatedGreeting = greetingService.update(greeting);
		if (updatedGreeting == null) {
			return new ResponseEntity<Greeting>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Greeting>(updatedGreeting, HttpStatus.OK);
	}

	/**
	 * Deletes the greeting based on the given id
	 * 
	 * @author Senthil
	 * @param id-User id
	 * @throws Nothing
	 * @return Collection<Greeting>, HttpStatus
	 * 
	 */
	@RequestMapping(value = "/greetings/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Greeting> deleteGreeting(@PathVariable("id") Long id) {
		greetingService.delete(id);
		return new ResponseEntity<Greeting>(HttpStatus.NO_CONTENT);
	}
}
