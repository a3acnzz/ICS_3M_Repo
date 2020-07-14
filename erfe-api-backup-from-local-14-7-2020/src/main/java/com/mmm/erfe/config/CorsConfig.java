package com.mmm.erfe.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 
 * @author RajKumar
 *
 */

/**
 * Cross origin acceptance
 * 
 * @author RajKumar
 *
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {
	/**
	 * Allowable methods and cross origin in this application
	 * 
	 * @author RajKumar
	 * @param registry-CorsRegistry
	 * @return Configuration result
	 *
	 */
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "TRACE")
				.maxAge(28800).allowCredentials(true);
	}

}
