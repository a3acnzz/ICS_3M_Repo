package com.mmm.erfe.exception;

import java.util.Date;
import java.util.LinkedHashMap;
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
public class DefaultExceptionAttributes implements ExceptionAttributes {

	/**
	 * Static final variable
	 * 
	 * @author Rajkumar
	 * @param void
	 * @return void
	 *
	 */
	public static final String TIMESTAMP = "timestamp";
	/**
	 * Static final variable
	 * 
	 * @author Rajkumar
	 * @param void
	 * @return void
	 *
	 */
	public static final String STATUS = "status";
	/**
	 * Static final variable
	 * 
	 * @author Rajkumar
	 * @param void
	 * @return void
	 *
	 */
	public static final String ERROR = "error";
	/**
	 * Static final variable
	 * 
	 * @author Rajkumar
	 * @param void
	 * @return void
	 *
	 */
	public static final String EXCEPTION = "exception";
	/**
	 * Static final variable
	 * 
	 * @author Rajkumar
	 * @param void
	 * @return void
	 *
	 */
	public static final String MESSAGE = "message";
	/**
	 * Static final variable
	 * 
	 * @author Rajkumar
	 * @param void
	 * @return void
	 *
	 */
	public static final String PATH = "path";

	/**
	 * Generation of Custom Exception Attributes
	 * 
	 * @author Rajkumar
	 * @param exception-Exception, httpRequest-HttpServletRequest,
	 *                             httpStatus-HttpStatus
	 * @return exceptionAttributes
	 *
	 */
	@Override
	public Map<String, Object> getExceptionAttributes(Exception exception, HttpServletRequest httpRequest,
			HttpStatus httpStatus) {

		Map<String, Object> exceptionAttributes = new LinkedHashMap<String, Object>();
		exceptionAttributes.put(TIMESTAMP, new Date());
		addHttpStatus(exceptionAttributes, httpStatus);
		addExceptionDetail(exceptionAttributes, exception);
		addPath(exceptionAttributes, httpRequest);
		return exceptionAttributes;
	}

	/**
	 * Adding current HttpStatus
	 * 
	 * @author Rajkumar
	 * @param exceptionAttributes-Map<String, Object>, httpStatus-HttpStatus
	 * @return void
	 *
	 */
	private void addHttpStatus(Map<String, Object> exceptionAttributes, HttpStatus httpStatus) {
		exceptionAttributes.put(STATUS, httpStatus.value());
		exceptionAttributes.put(ERROR, httpStatus.getReasonPhrase());
	}

	/**
	 * Adding details of exception
	 * 
	 * @author Rajkumar
	 * @param exceptionAttributes-Map<String, Object>, exception-Exception
	 * @return void
	 *
	 */
	private void addExceptionDetail(Map<String, Object> exceptionAttributes, Exception exception) {
		exceptionAttributes.put(EXCEPTION, exception.getClass().getName());
		exceptionAttributes.put(MESSAGE, exception.getMessage());
	}

	/**
	 * Adding Path of exception
	 * 
	 * @author Rajkumar
	 * @param exceptionAttributes-Map<String, Object>,
	 *                                        httpRequest-HttpServletRequest
	 * @return void
	 *
	 */
	private void addPath(Map<String, Object> exceptionAttributes, HttpServletRequest httpRequest) {
		exceptionAttributes.put(PATH, httpRequest.getServletPath());
	}

}
