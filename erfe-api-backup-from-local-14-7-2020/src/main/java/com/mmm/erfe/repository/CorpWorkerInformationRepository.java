package com.mmm.erfe.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mmm.erfe.domain.CorpWorkerInformation;

@Repository
public interface CorpWorkerInformationRepository extends JpaRepository<CorpWorkerInformation, Integer> {

}
