/*
 * package com.mmm.erfe.domain;
 * 
 * import javax.persistence.CascadeType; import javax.persistence.FetchType;
 * import javax.persistence.JoinColumn; import javax.persistence.ManyToOne;
 * import java.io.Serializable; import java.util.Objects;
 * 
 * public class CorpInformationIdentity implements Serializable {
 * 
 * @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
 * 
 * @JoinColumn(name="DOC_ID",nullable = false) private CorpPsRFE corpPsRFE;
 * 
 * @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
 * 
 * @JoinColumn(name="Information_Person_Id",nullable = false) private GlobalUser
 * informationPersonId;
 * 
 * public CorpPsRFE getCorpPsRFE() { return corpPsRFE; }
 * 
 * public void setCorpPsRFE(CorpPsRFE corpPsRFE) { this.corpPsRFE = corpPsRFE; }
 * 
 * public GlobalUser getInformationPersonId() { return informationPersonId; }
 * 
 * public void setInformationPersonId(GlobalUser informationPersonId) {
 * this.informationPersonId = informationPersonId; }
 * 
 * public CorpInformationIdentity(CorpPsRFE corpPsRFE, GlobalUser
 * informationPersonId) { this.corpPsRFE = corpPsRFE; this.informationPersonId =
 * informationPersonId; }
 * 
 * public CorpInformationIdentity(){
 * 
 * }
 * 
 * @Override public boolean equals(Object o) { if (this == o) return true; if
 * (!(o instanceof CorpInformationIdentity)) return false;
 * CorpInformationIdentity that = (CorpInformationIdentity) o; return
 * getCorpPsRFE().equals(that.getCorpPsRFE()) &&
 * getInformationPersonId().equals(that.getInformationPersonId()); }
 * 
 * @Override public int hashCode() { return Objects.hash(getCorpPsRFE(),
 * getInformationPersonId()); } }
 */