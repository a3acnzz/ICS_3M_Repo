package com.mmm.erfe.config;

import com.mmm.erfe.security.CustomUserDetailsService;
import com.mmm.erfe.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 
 * @author RajKumar
 *
 */

/**
 * JWT token generation
 * 
 * @author RajKumar
 *
 */
@Component
public class JwtRequestFilter extends OncePerRequestFilter {

	/**
	 * Dynamic object creation
	 * 
	 * @author RajKumar
	 * @param void
	 * @throws Nothing
	 * @return Object of CustomUserDetailsService
	 *
	 */
	@Autowired
	CustomUserDetailsService userDetailsService;
	/**
	 * Dynamic object creation
	 * 
	 * @author RajKumar
	 * @param void
	 * @throws Nothing
	 * @return Object of JwtUtil
	 *
	 */
	@Autowired
	JwtUtil jwtUtil;

	/**
	 * JWT token generation if user exist
	 * 
	 * @author RajKumar
	 * @param current request-HttpServletRequest, response-HttpServletResponse and
	 *                chain-FilterChain
	 * @throws ServletException, IOException
	 * @return void
	 *
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {

		final String authorizationHeader = request.getHeader("Authorization");
		String username = null;
		String jwt = null;

		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")
				&& "undefined".equalsIgnoreCase(authorizationHeader)) {
			jwt = authorizationHeader.substring(7);
			username = jwtUtil.extractUsername(jwt);
		}
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
			if (jwtUtil.validateToken(jwt, userDetails)) {
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				usernamePasswordAuthenticationToken
						.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}
		}
		chain.doFilter(request, response);
	}
}
