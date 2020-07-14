	package com.mmm.erfe.controller;

	import com.mmm.erfe.domain.AuthenticationRequest;
	import com.mmm.erfe.domain.AuthenticationResponse;
	import com.mmm.erfe.security.CustomUserDetail;
	import com.mmm.erfe.security.CustomUserDetailsService;

	import java.io.IOException;
	import java.util.ArrayList;
	import java.util.Arrays;
	import java.util.Enumeration;
	import java.util.List;
	import java.util.Map;

	import org.slf4j.Logger;
	import org.slf4j.LoggerFactory;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.http.MediaType;
	import org.springframework.http.ResponseEntity;
	import org.springframework.security.core.userdetails.UserDetails;
	import org.springframework.web.bind.annotation.*;
	import org.springframework.web.context.request.RequestContextHolder;
	import org.springframework.web.context.request.ServletRequestAttributes;

	import com.mmm.erfe.util.JwtUtil;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
	import javax.servlet.http.Cookie;
	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;

	/**
	 * 
	 * @author Senthil
	 *
	 */

	/**
	 * @author Senthil
	 *
	 */
	@RestController
	public class LoginController extends BaseController  	 {
		/**
		 * Dynamic object creation
		 * 
		 * @author Senthil
		 * @param void
		 * @throws Nothing
		 * @return Object of CustomUserDetailsService
		 *
		 */ 
		@Autowired
		CustomUserDetailsService customUserDetailsService;
		/**
		 * Dynamic object creation
		 * 
		 * @author Senthil
		 * @param void
		 * @throws Nothing
		 * @return Object of JwtUtil
		 *
		 */
		@Autowired
		JwtUtil jwtUtil;

		/**
		 * Main user entry point of API
		 * 
		 * @author Senthil
		 * @param current class
		 * @return void
		 *
		 */
		protected Logger logger = LoggerFactory.getLogger(this.getClass());
		private static final String VSRM_SECURITY_GROUP = "ERFE_ADMIN_CORPPS";

		/**
		 * Testing
		 * 
		 * @author Senthil
		 * @param void
		 * @throws Nothing
		 * @return String
		 *
		 */
		@RequestMapping({ "/hello" })
		public String firstPage() {
			logger.info("checking");
			return "Hello World";
		}

		/**
		 * Login
		 *
		 * @author Senthil
		 * @param authenticationRequest-AuthenticationRequest, username-cookie,
		 *                                                     grouplist-cookie,
		 *                                                     personid-cookie
		 * @throws Nothing
		 * @return JWT token per user login
		 * 
		 */
		@RequestMapping(value = "/api/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = {
				MediaType.APPLICATION_JSON_VALUE, MediaType.TEXT_PLAIN_VALUE, MediaType.TEXT_HTML_VALUE })
		public ResponseEntity<?> loggerin(@RequestBody AuthenticationRequest authenticationRequest,
				@RequestHeader(value = "HTTP_USERNAME", required = false) String username,
				@RequestHeader(value = "HTTP_GROUPLIST", required = false) String grouplist,
				@RequestHeader(value = "HTTP_PERSONID", required = false) String personid) {
			String groups = authenticationRequest.getGroupList();
			String env;
			logger.info("Login API method : USERNAME " + username + "GROUPLIST " + grouplist + "PERSONID " + personid);
			if (authenticationRequest.getGroupList() == "local") {
				env = "local";
			} else {
				env = "dev";
			}

			if (env != "local") {
				ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
				String userRole = "";
				if (isInGroup(groups, env)) {
					userRole = "Admin";
				} else {
					userRole = "User";
				}
				Cookie cookie = new Cookie("userRole", userRole);
				attr.getResponse().addCookie(cookie);
			}
			final UserDetails userDetails = customUserDetailsService.loadUserByUsername(authenticationRequest.getUsername(),
					authenticationRequest.getPersonId(),  env);
			final String jwt = jwtUtil.generateToken(userDetails.getUsername());
			return ResponseEntity.ok(new AuthenticationResponse(jwt));
		}
	    @RequestMapping(value = "/api/getProfile", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	    public ResponseEntity<?> getProfile(
	    		@RequestHeader( value = "HTTP_USERNAME", required = false) String username,
	    		@RequestHeader( value = "HTTP_GROUPLIST" , required = false) String grouplist,
	    		@RequestHeader( value = "HTTP_PERSONID" , required = false) String personid,
	    		@RequestHeader Map<String, String> headers) {
	            headers.forEach((key, value) -> {
	            	logger.info(String.format("Header '%s' = %s", key, value));
	             });  
	         
	                String env="dev";
	                logger.info("Login API method : USERNAME " + username + "GROUPLIST " + grouplist + "PERSONID " + personid);
	                System.out.println(" USERNAME " + username);
//	                if(authenticationRequest.getGroupList()=="local"){
//	                                 env = "local";
//	                }
//	                else{
//	                     env = "dev";
//	                }
	                
	                if (env != "local"){
	                   ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
	                 String userRole = null;
	                 if (isInGroup(grouplist, env)) {
	                     userRole="Admin";
	                 }
	                 else{
	                     userRole="User";
	                 }
	                 Cookie cookie = new Cookie("userRole", userRole);
	                   attr.getResponse().addCookie(cookie); 

	   				System.out.println(" userRole " + userRole);
	                }                 
	                final CustomUserDetail customUserDetail = customUserDetailsService.loadUserByUsername(username,personid, env);  

	   				System.out.println(" customUserDetail " + customUserDetail.getPersonId() + customUserDetail.getPrsnName());
	                return ResponseEntity.ok(customUserDetail);
	       }  

		public boolean isInGroup(String groupList, String env) {
			boolean inGroup = false;
			if (env.equals("local")) {
				inGroup = true;
				logger.debug("Local environment. No Tests Performed. User Authorized.");
			} else {
				if (groupList != null) {
					logger.debug("Testing Security group >> " + VSRM_SECURITY_GROUP);
					List<String> activeDirectoryGroups = new ArrayList<>();
					if (!groupList.isEmpty()) {
						activeDirectoryGroups = Arrays.asList(groupList.split("\\^"));
						if (activeDirectoryGroups.contains(VSRM_SECURITY_GROUP)) {
							inGroup = true;
							logger.debug("User has access to >> " + VSRM_SECURITY_GROUP);
						} else {
							inGroup = false;
							logger.debug("User has NO access to >> " + VSRM_SECURITY_GROUP);
						}
					}
				}
			}
			if (logger.isTraceEnabled()) {
				logger.trace("<< isInGroup()");
			}
			return inGroup;
		}
	  @RequestMapping(value = "/enllogin", method = RequestMethod.GET)
		public void doGet(HttpServletRequest request, 
			        HttpServletResponse response) throws ServletException, 
			        IOException 
		   {  
			    Enumeration<String> headerNames = request.getHeaderNames();	 		 
		        while (headerNames.hasMoreElements()) {	 
		            String headerName = headerNames.nextElement();
		            logger.info(headerName);	 
		            Enumeration<String> headers = request.getHeaders(headerName);
		            while (headers.hasMoreElements()) {
		                String headerValue = headers.nextElement();
		                logger.info(headerValue);
		            }
		 
		        }
		       // response.setHeader("Location", "erfe-dev.mmm.com");
		        //response.setStatus(302);
		      //return response.sendRedirect("erfe-dev.mmm.com");
		   }
	  @RequestMapping(value = "/", method = RequestMethod.GET)
	  public void enlLogin(	
	    @RequestHeader( value = "USERNAME", required = false) String username,
		@RequestHeader( value = "GROUPLIST" , required = false) String grouplist,
		@RequestHeader( value = "PERSONID" , required = false) String personid,
		@RequestHeader Map<String, String> headers) throws ServletException, IOException
	    {   logger.info("Login API method : USERNAME " + username + "GROUPLIST " + grouplist + "PERSONID " + personid);
            headers.forEach((key, value) -> {
            	logger.info(String.format("Header '%s' = %s", key, value));
             });
            String env = System.getProperty("mmm.app.env");
            logger.info("environment :"+ env);      
            String redirectUrl="https://erfe-qa.mmm.com/erfe/ui/";
            if (env == null) {
            	env = "qa";
            }
            if(env.trim().equalsIgnoreCase("dev")) {
            	

            	logger.info("dev env");
            	redirectUrl="https://erfe-dev.mmm.com/erfe/ui/";
            }
            else if (env.trim().equalsIgnoreCase("qa")) {
            	logger.info("qa env");
            	redirectUrl="https://erfe-qa.mmm.com/erfe/ui/";
            	
            }
            else if (env.trim().equalsIgnoreCase("prod")) {

            	logger.info("prod env");
            	redirectUrl="https://erfe.mmm.com/erfe/ui/";
            	
            }
            ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
            logger.info("username" + attr.getRequest().getHeader("USERNAME"));
            if (env != "local"){
              
               String userRole = null;
             if (isInGroup(grouplist, env)) {
                 userRole="Admin";
             }
             else{
                 userRole="User";
             }
             Cookie cookie = new Cookie("userRole", userRole);
             attr.getResponse().addCookie(cookie); 
			 logger.info(" userRole " + userRole);
            } 
            final CustomUserDetail customUserDetail = customUserDetailsService.loadUserByUsername(username, personid, env);
            attr.getResponse().addCookie(new Cookie("userId",customUserDetail.getPersonId()));
            attr.getResponse().addCookie(new Cookie("USERNAME",customUserDetail.getUsername()));
            logger.info(" customUserDetail " + customUserDetail.getPersonId() + customUserDetail.getPrsnName());
            attr.getResponse().sendRedirect(redirectUrl);
            
	    }
	    
}
