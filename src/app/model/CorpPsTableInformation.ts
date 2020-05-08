import { User } from './User';

export interface ICorpWorkerInformation{
    corpWorkerId:number;
    rderSeq: number;
    ResourceTitle: string;
    estimatedHours: number;
    rate: number;
    
}
export interface ICorpAccountingInformation {
    corpAccountId:number;
    accountMaster: accountIdClass[];
    departmentMaster: departmentIdClass[];
    wbs: string;
    accountFields: string;
    DistributionPer: number; 
}
export interface ICorpApproverInformation {
    corpApproverId:number;
    orderSeq: number;
    approverPin: User;
    approverComments: string;
    approverAction: string;
    actionDate: Date; 

    createdPersonId: string;
    createdDate: Date;
    modifiedPersonId: string;
    modifiedDate: Date;
}
export interface ICorpInformationalCopy{
    infoId:number;
    informationPersonId: User;
}


export class accountIdClass{
    accountId: number;
}
export class departmentIdClass{
    departmentId: number;
}
