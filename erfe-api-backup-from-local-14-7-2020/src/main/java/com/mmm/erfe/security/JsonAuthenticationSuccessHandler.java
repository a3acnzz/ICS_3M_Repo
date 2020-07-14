package com.mmm.erfe.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.mmm.erfe.security.CustomUserDetail;
import com.mmm.erfe.util.JwtUtil;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * 
 * @author Rajkumar
 *
 */
@Component
public class JsonAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	/**
	 * Dynamic object creation
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return Object of JwtUtil
	 *
	 */
	@Autowired
	 JwtUtil jwtUtil;

	/**
	 * Dynamic object creation
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return Object of CustomUserDetailsService
	 *
	 */
	@Autowired
	CustomUserDetailsService customUserDetailsService;

	/**
	 * On successful authentication
	 * 
	 * @author Rajkumar
	 * @param request-HttpServletRequest,response-HttpServletResponse,authentication-Authentication
	 * @throws IOException, ServletException
	 * @return void
	 *
	 */
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		CustomUserDetail user = (CustomUserDetail) authentication.getPrincipal();
		response.getWriter().append("OK");
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.addHeader("Cache-Control", "no-store");
		response.addHeader("Pragma", "no-cache");
		final UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getUsername());
		final String jwt = jwtUtil.generateToken(userDetails.getUsername());
		response.addHeader("Bearer", jwt);
		response.addHeader("USER_NAME", user.getUsername());
		response.setStatus(HttpServletResponse.SC_OK);
	}

}
