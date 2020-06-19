package com.mmm.erfe.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
* 
 * @author Rajkumar
*
*/

/**
* @author Rajkumar
*
*/
@Entity
@Table(name = "t_PS_Req_Num")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class RfeNumData {

                /**
                * id-Auto incremented primary key variable of type String
                * 
                 * @author Sowmya
                * @param void
                * @throws Nothing
                * @return void
                *
                */
                @Id
                @GeneratedValue(strategy = GenerationType.IDENTITY)
                @Column(name = "Person_ID", updatable = false, nullable = false)
                private String personId;

                /**
                * personId-Variable of type String
                * 
                 * @author Sowmya
                * @param void
                * @throws Nothing
                * @return void
                *
                */
                
                

                /**
                * psIdentity-Variable of type String
                * 
                 * @author Sowmya
                * @param void
                * @throws Nothing
                * @return void
                *
                */
                @Column(name = "PS", nullable = false)
                private String psIdentity;

                /**
                * reqNum-Variable of type String
                * 
                 * @author Sowmya
                * @param void
                * @throws Nothing
                * @return void
                *
                */
                @Column(name = "num", nullable = false)
                private String reqNum;

                /**
                * Get person id field of V_PS_Req_Num(RfeNumData) table
                * 
                 * @author Sowmya
                * @param void
                * @throws Nothing
                * @return personId of type String
                *
                */
                public String getPersonId() {
                                return personId;
                }


                /**
                * Set person id field of V_PS_Req_Num(RfeNumData) table
                * 
                 * @author Sowmya
                * @param personId-value of type String
                * @throws Nothing
                * @return void
                *
                */
                public void setPersonId(String personId) {
                                this.personId = personId;
                }

                /**
                * Get ps identity field of V_PS_Req_Num(RfeNumData) table
                * 
                 * @author Sowmya
                * @param void
                * @throws Nothing
                * @return psIdentity of type String
                *
                */
                public String getPsIdentity() {
                                return psIdentity;
                }

                /**
                * Set ps identity field of V_PS_Req_Num(RfeNumData) table
                * 
                 * @author Sowmya
                * @param psIdentity-value of type String
                * @throws Nothing
                * @return void
                *
                */
                public void setPsIdentity(String psIdentity) {
                                this.psIdentity = psIdentity;
                }

                /**
                * Get req num field of V_PS_Req_Num(RfeNumData) table
                * 
                 * @author Sowmya
                * @param void
                * @throws Nothing
                * @return reqNum of type String
                *
                */
                public String getReqNum() {
                                return reqNum;
                }

                /**
                * Set req num field of V_PS_Req_Num(RfeNumData) table
                * 
                 * @author Sowmya
                * @param reqNum-value of type String
                * @throws Nothing
                * @return void
                *
                */
                public void setReqNum(String reqNum) {
                                this.reqNum = reqNum;
                }

}
