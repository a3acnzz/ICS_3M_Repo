export class Workers{
    hours: string;
    dollars:string;
    designatedCat:string;
    workerName  :string;
}
export class Account{
    costCenter:string;
    distributionPercentage:string;
    wbs:string;
    account:string;
    otherCharts:string;
}
export class InfoContact{
    siteCntc: string;
    projCord:string;
    infoCopy:string;
}
export class Renewal{
    rfeNo:string;
    projectTitle:string;
    description:string;
    supplierNumber:string;
    startDate:string;
    completionDate:string;
    additionalExp:string;
    approvalAmt:string;
    supplierName:string;
    hourly:string;
    fixed:string;
    personId:string;
    informationId:string[];
    workers:Workers[];
    account:Account[];
    informationCopy:InfoContact[];
}
