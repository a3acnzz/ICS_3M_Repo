package com.mmm.erfe.domain;

import javax.persistence.*;

/**
 * 
 * @author Sowmya
 *
 */

/**
 * @author Sowmya
 *
 */
@Entity
@Table(name = "Greeting")
public class Greeting {

	/**
	 * Parameterized Constructor
	 * 
	 * @author Sowmya
	 * @param text-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public Greeting(String text) {
		super();
		this.text = text;
	}

	/**
	 * id-Auto incremented primary key variable of type Long
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue
	private Long id;

	/**
	 * text-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "decription")
	private String text;

	/**
	 * Constructor
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	public Greeting() {

	}

	/**
	 * Get id field of Greeting(Greeting) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return id of type Long
	 *
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Set id field of Greeting(Greeting) table
	 * 
	 * @author Sowmya
	 * @param id-value of type Long
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Get text field of Greeting(Greeting) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return text of type String
	 *
	 */
	public String getText() {
		return text;
	}

	/**
	 * Set text field of Greeting(Greeting) table
	 * 
	 * @author Sowmya
	 * @param text-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setText(String text) {
		this.text = text;
	}

}
