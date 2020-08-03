import { User } from './User';

export class ActivityLog {
    corpLogId?: number;
    logAction: string;
    logPersonPin: User;
    logDesc: string;
    logActionDate: Date;
}

export class logPerson {
    active: boolean;
    deptCode: string;
    deptName: string;
    personFirstName; string;
    personId: string;
    personLastName: string;
    personMiddleName: string;
    personPhoneNum: string;
    userPin: string;
}
export class activityLogConstruct {
    logActionDate: Date;
    logAction: string;
    roles: string;
    logDescConstruct: string;
    userPinWithName: string;
    active: string;
    personNameConstruct: string;
}