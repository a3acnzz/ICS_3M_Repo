package com.mmm.erfe.repository;

import com.mmm.erfe.domain.GlobalUser;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * 
 * @author Rajkumar
 *
 */

/**
 * GlobalUserRepository extends JpaRepository<GlobalUser, String>
 * 
 * @author Rajkumar
 *
 */
@Repository
public interface GlobalUserRepository extends JpaRepository<GlobalUser, String> {

	/**
	 * Query for searching user based on given userpinTxt
	 * 
	 * @author RajKumar
	 * @param userpinTxt
	 * @throws Nothing
	 * @return GlobalUser
	 */
	public GlobalUser findByUserPin(String userpinTxt);

	/**
	 * Query for searching user for approver lookup
	 * 
	 * @author RajKumar
	 * @param void
	 * @throws Nothing
	 * @return Collection of <GlobalUser>
	 *
	 */

	@Query(value = "select top 1000 * from t_person_master_detail p inner join t_approver_master_detail a on p.Person_ID = a.PersonId where p.isActive='A' ", nativeQuery = true)
	public Collection<GlobalUser> getAllGlobalUserForApprovar();

	@Query(value = "select top 1000 * from t_person_master_detail p left join t_approver_master_detail a on p.Person_ID = a.PersonId  WHERE p.Person_ID LIKE %:personId% AND p.user_pin LIKE %:userPin% AND p.Person_First_Name LIKE :firstName AND p.Person_Last_Name LIKE :lastName AND p.isActive='A'", nativeQuery = true)
	public Collection<GlobalUser> getGlobalUserForApprovar(@Param("personId") String personId,
			@Param("userPin") String userPin, @Param("firstName") String firstName, @Param("lastName") String lastName);

	@Query(value = "SELECT top 1000 * FROM  t_person_master_detail p WHERE p.Person_ID LIKE %:personId% AND p.user_pin LIKE %:userPin% AND p.Person_First_Name LIKE :firstName AND p.Person_Last_Name LIKE :lastName AND p.isActive='A'", nativeQuery = true)
	public List<GlobalUser> find(@Param("personId") String personId, @Param("userPin") String userPin,
			@Param("firstName") String firstName, @Param("lastName") String lastName);

	@Query(value = "SELECT top 1000 * FROM  t_person_master_detail ", nativeQuery = true)
	public List<GlobalUser> findAll();

	@Query("select o from GlobalUser o where o.personId in :ids AND o.isActive='A'")
	public List<GlobalUser> findByInventoryIdIn(@Param("ids") List<String> ids);
}
