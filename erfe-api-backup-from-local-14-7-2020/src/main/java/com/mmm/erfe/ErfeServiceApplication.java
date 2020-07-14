package com.mmm.erfe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

/**
 * 
 * @author Senthil
 *
 */

/**
 * Container class of Spring Boot
 * 
 * @author Senthil
 * @param current class
 * @return void
 *
 */
@EnableCaching
@SpringBootApplication
public class ErfeServiceApplication {
	/**
	 * Main method of Spring Boot
	 * 
	 * @author Senthil
	 * @param args-current class
	 * @return void
	 *
	 */
	public static void main(String[] args) {
		SpringApplication.run(ErfeServiceApplication.class, args);
	}
}
