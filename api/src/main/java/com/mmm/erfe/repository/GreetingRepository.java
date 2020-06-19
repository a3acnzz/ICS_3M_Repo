package com.mmm.erfe.repository;

import com.mmm.erfe.domain.Greeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 
 * @author Senthil
 *
 */

/**
 * GreetingRepository extends JpaRepository<Greeting, Long>
 * 
 * @author Senthil
 * @param void
 * @throws Nothing
 * @return void
 *
 */
@Repository
public interface GreetingRepository extends JpaRepository<Greeting, Long> {

}
