package com.mmm.erfe.security;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.Cookie;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.mmm.erfe.domain.GlobalUser;
import com.mmm.erfe.repository.GlobalUserRepository;
import com.mmm.erfe.util.AppConstant;

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
@Service
public class CustomUserDetailsService implements UserDetailsService {

	/**
	 * Final variable of type List
	 * 
	 * @author Rajkumar
	 * @param Object of SimpleGrantedAuthority("ROLE_USER")
	 * @return void
	 *
	 */
	static final List ROLE_USER = Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));
	/**
	 * Main user entry point of API
	 * 
	 * @author Rajkumar
	 * @param current class
	 * @return void
	 *
	 */
	protected Logger logger = LoggerFactory.getLogger(this.getClass());
	/**
	 * Dynamic object creation
	 * 
	 * @author Rajkumar
	 * @param void
	 * @throws Nothing
	 * @return Object of GlobalUserRepository
	 *
	 */
	@Autowired
	GlobalUserRepository globalUserRepository;

	/**
	 * Checks user exist or not in database
	 * 
	 * @author Rajkumar
	 * @param username-cookie, PersonId-cookie, PersonName-cookie, env-Environment
	 * @throws UsernameNotFoundException
	 * @return CustomUserDetail object if user exist
	 *
	 */
	public CustomUserDetail loadUserByUsername(String username, String PersonId, String env)
			throws UsernameNotFoundException {
			ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
//			if (username != null) {

//				Cookie[] cookie = attr.getRequest().getCookies();
//				if (cookie != null) {
//					for (int coo = 0; coo < cookie.length; coo++) {
//						Cookie cookies = cookie[coo];
//						if (AppConstant.HEADER_USER_NAME.equalsIgnoreCase(cookies.getName())) {
//							if (cookies != null)
//								username = cookies.getName().trim();
//							  logger.info("username" +username);

//						logger.debug(cookies.getName());
//						if (AppConstant.HEADER_USER_NAME.equalsIgnoreCase(cookies.getName())) {
//							if (cookies != null)
//								username = cookies.getName().trim();

//						}
//					}
//				}
//
//			}
//
//			if (username == null) {
//				username = "A6A7MZZ";

			if(username==null)
				throw new UsernameNotFoundException(String.format("The username doesn't exist"));		


			logger.info("username" +username);
			GlobalUser user = globalUserRepository.findByUserPin(username);
			if (user == null) {
				throw new UsernameNotFoundException(String.format("The username doesn't exist"));
			}
			return new CustomUserDetail(user.getUserPin().trim(), user.getUserPin().trim(), true, true, true, true,
					(ROLE_USER), user.getPersonFirstName().trim(), user.getPersonId().trim());		
		
	}

	/**
	 * Load user by user name
	 * 
	 * @author Rajkumar
	 * @param username-cookie
	 * @throws UsernameNotFoundException
	 * @return null
	 *
	 */
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return null;
	}
}
