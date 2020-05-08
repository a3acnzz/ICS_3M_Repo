
export class ddlListStr {
    name: string;
    code: string;
}

export class customLogs {
    value: string;
}
export class NewRfeForm {
    orderFrom: string
    personID: string
    phoneNumber: string
    projectCoordinator: string
    projectTitle: string
    serviceDescription: string
    startDate: Date
    completionDate: Date
    contactName: string
    coordinatorPersonID: string
    coordinatorPhoneNumber: string
    additionalExpenses: number
    acctInfo: AccInfo[];
    approval: Approval[];
    informationalCopy: InformationalCopy[];
    workerInfo: WorkerInfo[]
}
export class AccInfo {
    account: string
    dept: string
    wbs: string
    accountFields: string
    distribution: string
}
export class Approval {
    approvalName: string
    personId: string
}
export class InformationalCopy {
    infoName: string
    infoPersonId: string
}
export class WorkerInfo {
    resourseTitle: string
    estHours: number
    rate: number
}
export class SiteContactName {
    name: string;
    pin: string;
    personId: string;
    phone: string;
    deptCode: string;
    deptName: string;
}
export class Coordinators{
    name: string;
    pin: string;
    personId: string;
    phone: string;
    deptCode: string;
    deptName: string;
}
export class Order{
    supplierBase: string
     name: string 
}
export class Department{
    costCenter: string
     desc: string 
}
export class Account{
    id:string
    desc:string
}
export class ApprovalInfo{
    name: string;
    pin: string;
    personId: string;
    phone: string;
    deptCode: string;
    deptName: string;
}
export class Information{
    name: string;
    pin: string;
    personId: string;
    phone: string;
    deptCode: string;
    deptName: string;
}