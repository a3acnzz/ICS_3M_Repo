/*
 * package com.mmm.erfe.domain;
 * 
 * import javax.persistence.CascadeType; import javax.persistence.FetchType;
 * import javax.persistence.JoinColumn; import javax.persistence.ManyToOne;
 * import java.io.Serializable; import java.util.Objects;
 * 
 * public class CorpAccountingInformationIdentity implements Serializable {
 * 
 * @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
 * 
 * @JoinColumn(name="DOC_ID",nullable = false) private CorpPsRFE corpPsRFE;
 * 
 * @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
 * 
 * @JoinColumn(name="Account_Id",nullable = false) private AccountMaster
 * accountMaster;
 * 
 * @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
 * 
 * @JoinColumn(name="Dept_Id",nullable = false) private DepartmentMaster
 * departmentMaster;
 * 
 * public CorpPsRFE getCorpPsRFE() { return corpPsRFE; }
 * 
 * public void setCorpPsRFE(CorpPsRFE corpPsRFE) { this.corpPsRFE = corpPsRFE; }
 * 
 * public AccountMaster getAccountMaster() { return accountMaster; }
 * 
 * public void setAccountMaster(AccountMaster accountMaster) {
 * this.accountMaster = accountMaster; }
 * 
 * public DepartmentMaster getDepartmentMaster() { return departmentMaster; }
 * 
 * public void setDepartmentMaster(DepartmentMaster departmentMaster) {
 * this.departmentMaster = departmentMaster; }
 * 
 * @Override public boolean equals(Object o) { if (this == o) return true; if
 * (!(o instanceof CorpAccountingInformationIdentity)) return false;
 * CorpAccountingInformationIdentity that = (CorpAccountingInformationIdentity)
 * o; return getCorpPsRFE().equals(that.getCorpPsRFE()) &&
 * getAccountMaster().equals(that.getAccountMaster()) &&
 * getDepartmentMaster().equals(that.getDepartmentMaster()); }
 * 
 * @Override public int hashCode() { return Objects.hash(getCorpPsRFE(),
 * getAccountMaster(), getDepartmentMaster()); } }
 */