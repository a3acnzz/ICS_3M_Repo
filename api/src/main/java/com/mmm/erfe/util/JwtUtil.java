package com.mmm.erfe.util;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

/**
 * 
 * @author Senthil
 *
 */

/**
 * 
 * @author Senthil
 *
 */
@Service
public class JwtUtil implements Serializable {
	/**
	 * Static final variable
	 * 
	 * @author Senthil
	 * @param void
	 * @return void
	 *
	 */
	private static final long serialVersionUID = -2550185165626007488L;
	/**
	 * String variable
	 * 
	 * @author Senthil
	 * @param void
	 * @return void
	 *
	 */
	private String SECRET_KEY = "erfe-11557C3D1488582A2935788663EC5";

	/**
	 * Get account_id of t_account_master_detail(AccountMaster) table
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return accountId of type Integer
	 *
	 */
	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	/**
	 * Extracting JWt token expiration
	 * 
	 * @author Senthil
	 * @param token-String
	 * @throws Nothing
	 * @return the function result
	 *
	 */
	public Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	/**
	 * Extracting claim
	 * 
	 * @author Senthil
	 * @param token-String,claimsResolver-Function<Claims, T>
	 * @throws Nothing
	 * @return the function result
	 *
	 */
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	/**
	 * Extracting claims
	 * 
	 * @author Senthil
	 * @param token-String
	 * @throws Nothing
	 * @return all claims
	 *
	 */
	private Claims extractAllClaims(String token) {
		return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
	}

	/**
	 * Checks token expiration
	 * 
	 * @author Senthil
	 * @param token-String
	 * @throws Nothing
	 * @return Boolean
	 *
	 */
	private Boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	/**
	 * Generate JWT Token
	 * 
	 * @author Senthil
	 * @param userName-cookie
	 * @throws Nothing
	 * @return jwt token
	 *
	 */
	public String generateToken(String userName) {
		Map<String, Object> claims = new HashMap<>();
		return createToken(claims, userName);
	}

	/**
	 * Create JWT token
	 * 
	 * @author Senthil
	 * @param claims-Map<String, Object>,subject-String
	 * @throws Nothing
	 * @return jwt token
	 *
	 */
	private String createToken(Map<String, Object> claims, String subject) {

		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
				.signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
	}

	/**
	 * Validate JWT token
	 * 
	 * @author Senthil
	 * @param token-String,userDetails-UserDetails
	 * @throws Nothing
	 * @return Boolean
	 *
	 */
	public Boolean validateToken(String token, UserDetails userDetails) {
		final String username = extractUsername(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
}
