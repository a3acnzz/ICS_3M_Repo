package com.mmm.erfe.domain;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
@Entity
@Table(name = "t_department_master_detail")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class DepartmentMaster implements Serializable {

	/**
	 * departmentId-Auto incremented primary key variable of type Integer
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "department_id", nullable = false)
	private Integer departmentId;

//    @Column(name = "department_name",nullable = false)
//    private String departmentName;

	/**
	 * departmentDesc-Variable of type String
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "department_description")
	private String departmentDesc;

	/**
	 * isActive-Variable of type boolean
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return void
	 *
	 */
	@Column(name = "isActive", nullable = false, columnDefinition = "false")
	private String isActive;

	/**
	 * Parameterized Constructor
	 * 
	 * @author Sowmya
	 * @param departmentDesc-value of type String, isActive-value of type boolean
	 * @throws Nothing
	 * @return void
	 *
	 */
	public DepartmentMaster(String departmentDesc, String isActive) {

		this.departmentDesc = departmentDesc;
		this.isActive = isActive;
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
	public DepartmentMaster() {

	}

	/**
	 * Get department id field of t_department_master_detail(DepartmentMaster) table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return departmentId of type Integer
	 *
	 */
	public Integer getDepartmentId() {
		return departmentId;
	}

	/**
	 * Set department id field of t_department_master_detail(DepartmentMaster) table
	 * 
	 * @author Sowmya
	 * @param departmentId-value of type Integer
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

//    public String getDepartmentName() {
//        return departmentName;
//    }
//
//    public void setDepartmentName(String departmentName) {
//        this.departmentName = departmentName;
//    }

	/**
	 * Get department desc field of t_department_master_detail(DepartmentMaster)
	 * table
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return departmentDesc of type String
	 *
	 */
	public String getDepartmentDesc() {
		return departmentDesc;
	}

	/**
	 * Set department desc field of t_department_master_detail(DepartmentMaster)
	 * table
	 * 
	 * @author Sowmya
	 * @param departmentDesc-value of type String
	 * @throws Nothing
	 * @return void
	 *
	 */
	public void setDepartmentDesc(String departmentDesc) {
		this.departmentDesc = departmentDesc;
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
	
}
