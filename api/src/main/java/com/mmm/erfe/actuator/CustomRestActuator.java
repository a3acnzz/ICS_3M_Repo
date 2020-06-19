package com.mmm.erfe.actuator;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * 
 * @author RajKumar
 *
 */
/**
 * Rest end point actuator
 * 
 * @author RajKumar
 *
 */
@Component
@RestController(value = "custom-rest-endpoint")
public class CustomRestActuator {
	/**
	 * Get mapping
	 * 
	 * @author RajKumar
	 * @param void
	 * @return current date and time
	 *
	 */
	@GetMapping
	public Map<String, String> get() {
		Map<String, String> map = new HashMap<>();
		map.put("server.date", LocalDate.now().toString());
		map.put("server.time", LocalTime.now().toString());
		return map;
	}

	/**
	 * Post mapping
	 * 
	 * @author RajKumar
	 * @param request-current request
	 * @return a string
	 *
	 */
	@PostMapping
	public String post(@RequestBody String request) {
		return "We have received your request: " + request;
	}
}
