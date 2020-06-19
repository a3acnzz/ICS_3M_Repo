package com.mmm.erfe.domain;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.io.Serializable;

/**
 * 
 * @author Sowmya
 *
 */

/**
 * @author Sowmya
 *
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ "fieldName", "value" })
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
@Table(name = "t_provider_master_detail")
public class ProviderMaster implements Serializable {

	private static final long serialVersionUID = 1203489585263494473L;

	/**
	 * providerId-Auto incremented primary key variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "provider_id", updatable = false, nullable = false)
	private String providerId;

	/**
	 * providerName-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "Provider_FullName", nullable = false)
	private String providerName;

	/**
	 * isActive-Variable of type Boolean
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "isActive", nullable = false, columnDefinition = "true")
	private String isActive;

	/**
	 * Get provider id field of t_provider_master_detail(ProviderMaster) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return providerId of type String
	 *
	 */
	public String getProviderId() {
		return providerId;
	}

	/**
	 * Set provider id field of t_provider_master_detail(ProviderMaster) table
	 * 
	 * @author Sowmya
	 * @param providerId-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setProviderId(String providerId) {
		this.providerId = providerId;
	}

	/**
	 * Get provider name field of t_provider_master_detail(ProviderMaster) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return providerName of type String
	 *
	 */
	public String getProviderName() {
		return providerName;
	}

	/**
	 * Set provider name field of t_provider_master_detail(ProviderMaster) table
	 * 
	 * @author Sowmya
	 * @param providerName-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setProviderName(String providerName) {
		this.providerName = providerName;
	}

	/**
	 * Get isActive of t_person_master_detail(GlobalUser) table
	 * 
	 * @author senthil
	 * @param void
	 * @throws Nothing
	 * @return isActive of type boolean
	 *
	 */
	public String getIsActive() {
		return isActive;
	}

	/**
	 * Set active field of t_person_master_detail(GlobalUser) table
	 * 
	 * @author senthil
	 * @param active-value of type boolean
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setIsActive(String isActive) {
		this.isActive = isActive;
	}

	/**
	 * Get serial version UID field of t_provider_master_detail(ProviderMaster)
	 * table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return serialVersionUID of type long
	 *
	 */
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	

	

	/**
	 * Constructor
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	public ProviderMaster() {
	}
}
