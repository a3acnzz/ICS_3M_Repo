package com.mmm.erfe.controller;

import java.util.Map;

import javax.persistence.NoResultException;
import javax.servlet.http.HttpServletRequest;

import com.mmm.erfe.exception.DefaultExceptionAttributes;
import com.mmm.erfe.exception.ExceptionAttributes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * 
 * @author Senthil
 *
 */

/**
 * Base controller for exception handling
 * 
 * @author Senthil
 *
 */
public class BaseController {
	/**
	 * Main user entry point of API
	 * 
	 * @author Senthil
	 * @param current class
	 * @return void
	 *
	 */
	protected Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 * Handle No Result Exception
	 * 
	 * @author Senthil
	 * @param current request
	 * @return ResponseEntity of request and HttpStatus
	 *
	 */
	@ExceptionHandler(NoResultException.class)
	public ResponseEntity<Map<String, Object>> handleNoResultException(NoResultException noResultException,
			HttpServletRequest request) {
		ExceptionAttributes exceptionAttributes = new DefaultExceptionAttributes();
		Map<String, Object> responseBody = exceptionAttributes.getExceptionAttributes(noResultException, request,
				HttpStatus.NOT_FOUND);
		return new ResponseEntity<Map<String, Object>>(responseBody, HttpStatus.NOT_FOUND);
	}

	/**
	 * Handle Exceptions
	 * 
	 * @author Senthil
	 * @param current request
	 * @return ResponseEntity of request and HttpStatus
	 *
	 */
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Map<String, Object>> handleException(Exception exception, HttpServletRequest request) {
		ExceptionAttributes exceptionAttributes = new DefaultExceptionAttributes();
		Map<String, Object> responseBody = exceptionAttributes.getExceptionAttributes(exception, request,
				HttpStatus.INTERNAL_SERVER_ERROR);
		return new ResponseEntity<Map<String, Object>>(responseBody, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
