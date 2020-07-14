package com.mmm.erfe.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.mmm.erfe.security.CustomUserDetailsService;
import com.mmm.erfe.security.JsonAuthenticationSuccessHandler;

/**
 * 
 * @author RajKumar
 *
 */

/**
 * Web security configuration
 * 
 * @author RajKumar
 *
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

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
	 * AuthenticationManager
	 * 
	 * @author RajKumar
	 * @param void
	 * @throws Exception
	 * @return Object of AuthenticationManager
	 *
	 */
	@Bean("authenticationManager")
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	/**
	 * Dynamic object creation-Global user details
	 * 
	 * @author RajKumar
	 * @param auth-AuthenticationManagerBuilder
	 * @throws Exception
	 * @return void
	 *
	 */
	@Autowired
	public void globalUserDetails(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	}

	/**
	 * Dynamic object creation
	 * 
	 * @author RajKumar
	 * @param void
	 * @throws Nothing
	 * @return Object of JsonAuthenticationSuccessHandler
	 *
	 */
	@Autowired
	JsonAuthenticationSuccessHandler jsonAuthenticationSuccessHandler;

	/**
	 * Session management and authorization
	 * 
	 * @author RajKumar
	 * @param httpSecurity-HttpSecurity
	 * @throws Exception
	 * @return void
	 *
	 */
	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {

		httpSecurity.authorizeRequests().antMatchers(HttpMethod.OPTIONS, "/**").permitAll().antMatchers("/**")
				.permitAll().anyRequest().authenticated().and().cors().configurationSource(corsConfigurationSource())
				.and().csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		// httpSecurity.addFilterBefore(jwtRequestFilter,
		// UsernamePasswordAuthenticationFilter.class);

	}

	/**
	 * Dynamic object creation-Interface to be implemented by classes (usually HTTP
	 * request handlers) that provides a CorsConfiguration instance based on the
	 * provided request.
	 * 
	 * @author RajKumar
	 * @param httpSecurity-HttpSecurity
	 * @throws Nothing
	 * @return source-Provide a per request CorsConfiguration instance based on a
	 *         collection of CorsConfiguration mapped on path patterns.
	 *
	 */
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "HEAD", "TRACE"));
		configuration.setAllowedHeaders(
				Arrays.asList("origin", "authorization", "accept", "content-type", "x-requested-with","HTTP_USERNAME","HTTP_GROUPLIST","HTTP_PERSONID"));
		configuration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}
