package com.mmm.erfe.config;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 * 
 * @author RajKumar
 *
 */
/**
 * Login authentication
 * 
 * @author RajKumar
 * @param void
 * @return void
 */
@Component
public class AuthenticationEntryPoint extends BasicAuthenticationEntryPoint {

	/**
	 * Authentication commence
	 * 
	 * @author Senthil
	 * @param current request-HttpServletRequest, response-HttpServletResponse and
	 *                authEx-AuthenticationException
	 * @throws IOException
	 * @return HttpStatus
	 *
	 */
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authEx)
			throws IOException {
		response.addHeader("WWW-Authenticate", "Basic realm=" + getRealmName());
		// response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.addHeader("Bearer", "TestBearer");
		PrintWriter writer = response.getWriter();
		writer.println("HTTP Status 200 - ");
	}

	/**
	 * Invoked by the containing BeanFactory after it has set all bean properties
	 * and satisfied
	 * 
	 * @author Senthil
	 * @param void
	 * @return void
	 *
	 */
	@Override
	public void afterPropertiesSet() {
		setRealmName("DeveloperStack");
		super.afterPropertiesSet();
	}

}
