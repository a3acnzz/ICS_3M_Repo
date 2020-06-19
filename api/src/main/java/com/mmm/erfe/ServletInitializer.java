package com.mmm.erfe;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * 
 * @author Senthil
 *
 */

/**
 * ServletInitializer of the application
 * 
 * @author Senthil
 * @param void
 * @return current class load
 *
 */
public class ServletInitializer extends SpringBootServletInitializer {
	/**
	 * ServletInitializer of the application
	 * 
	 * @author Senthil
	 * @param application-SpringApplicationBuilder
	 * @return current class load
	 *
	 */
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(ErfeServiceApplication.class);
	}

}
