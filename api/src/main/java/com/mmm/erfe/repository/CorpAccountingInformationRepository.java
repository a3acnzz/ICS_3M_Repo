package com.mmm.erfe.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mmm.erfe.domain.CorpAccountingInformation;

@Repository
public interface CorpAccountingInformationRepository extends JpaRepository<CorpAccountingInformation, Integer> {

}
