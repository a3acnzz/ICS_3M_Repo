package com.mmm.erfe.exception;

import org.springframework.http.HttpStatus;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * @author Rajkumar
 *
 */
public class CustomException extends RuntimeException {
	/**
	 * Static final variable
	 * 
	 * @author Rajkumar
	 * @param void
	 * @return void
	 *
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * Final String variable
	 * 
	 * @author Rajkumar
	 * @param void
	 * @return void
	 *
	 */
	private final String message;
	/**
	 * Final String variable
	 * 
	 * @author Rajkumar
	 * @param void
	 * @return void
	 *
	 */
	private final HttpStatus httpStatus;

	/**
	 * Parameterized Constructor
	 * 
	 * @author Rajkumar
	 * @param message-String, httpStatus-HttpStatus
	 * @return ResponseEntity of request and HttpStatus
	 *
	 */
	public CustomException(String message, HttpStatus httpStatus) {
		this.message = message;
		this.httpStatus = httpStatus;
	}

	/**
	 * Get message
	 * 
	 * @author Rajkumar
	 * @param void
	 * @return message
	 *
	 */
	@Override
	public String getMessage() {
		return message;
	}

	/**
	 * Get httpStatus
	 * 
	 * @author Rajkumar
	 * @param void
	 * @return httpStatus
	 *
	 */
	public HttpStatus getHttpStatus() {
		return httpStatus;
	}

}
