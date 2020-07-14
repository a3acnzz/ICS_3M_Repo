import { User } from './User';
import { StatusMaster} from './StatusMaster'
import { BidMaster} from './BidMaster'
import { ProviderMaster} from './ProviderMaster'
import { ICorpWorkerInformation, ICorpAccountingInformation, ICorpApproverInformation, ICorpInformationalCopy } from './CorpPsTableInformation';
import { ActivityLog } from './ActivityLog';

export class CorpsRFE{
  docId:number;
  projectTitle:string='';
  projectDesc:string='';
  comments:string='';
  corpPSReqNum:string='';
  fixedBidAmount:number;
  //CorpPSReqNum:string
  rfeNum:number;
  requesterPerson:User;
  siteContactPin:User;
  projectCoordinator:User;
  statusMaster:StatusMaster;
  bidMaster:BidMaster;
  providerMaster:ProviderMaster;
  startDate:Date=new Date();
  completionDate:Date=new Date();
  expenses:number=0;
  approvedAmount:number=0;
  createdPersonId:string;
  createdDate:Date=new Date();
  modifiedPersonId:string;
  modifiedDate:Date=new Date();


  accountingInformation: ICorpAccountingInformation[];
  workerInformation: ICorpWorkerInformation[];
  approverInformation: ICorpApproverInformation[];
  informationalCopyInformation: ICorpInformationalCopy[];
   

  activityLogInformation: ActivityLog[];
  renewedRfeNum:string; 
}