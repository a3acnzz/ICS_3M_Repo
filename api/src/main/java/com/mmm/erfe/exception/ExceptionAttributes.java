package com.mmm.erfe.exception;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
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
public interface ExceptionAttributes {
	/**
	 * Custom exception attribute generation interface
	 * 
	 * @author Rajkumar
	 * @param exception-Exception, httpRequest-HttpServletRequest,
	 *                             httpStatus-HttpStatus
	 * @return exceptionAttributes
	 *
	 */
	Map<String, Object> getExceptionAttributes(Exception exception, HttpServletRequest httpRequest,
			HttpStatus httpStatus);

}
