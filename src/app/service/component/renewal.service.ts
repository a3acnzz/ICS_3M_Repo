import { Injectable } from '@angular/core';
import { Renewal } from 'src/app/model/Renewal';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HttpService } from '../base/http.service';
import { UrlConstant } from 'src/app/shared/constant/url.constant';

@Injectable({
  providedIn: 'root'
})
export class RenewalService {


  constructor(private httpService: HttpService) {

  }

getRenewForm(rfeNo)
{
    const params: any ={rfeNo:rfeNo};
    return this.httpService.get(UrlConstant.getRenewData,params);
}

isPresentRfeNumberForRenwal(rfeNo){
  const params: any ={rfeNo:rfeNo};
  return this.httpService.get(UrlConstant.getRenewalRfeNumberSearch,params);
}


getRenewalDash()
{
    const params: any ={};
    return this.httpService.get(UrlConstant.getRenewalDashboard,params);
}




}


















//   getRenawal(): Observable<Renewal[]> {
//     this.simpleObservable.subscribe;
//     return this.simpleObservable;
//   }
//   getRenewal(rf: string): Observable<Renewal> {
//     for (let i = 0; i < RenewalData.length; i++) {
//       if (RenewalData[i].rfeNo = rf) {
//         this.renewal = RenewalData[i]
//         break;
//       }
//     }

//     this.renewalObervable = new Observable((observer) => {
//       observer.next(this.renewal)
//       observer.complete()
//     });
    
//     return this.renewalObervable;

//   }

// }

// export const RenewalData: Renewal[] = [
//   {
//     rfeNo: 65551, projectTitle: 'Pioneer Rewards Phase 2', 
//     description: 'Program generated over $40 million annually of new sales through face to face selling at end users .3M leads in the market in sales recognition & this platform provides a means to ensure that one fundamental strategy is reinforced;new businessdevelopment.',
//     supplierNumber: '1605518', startDate: '04/30/2019 12:00:00 AM', completionDate: '', additionalExp:'9000', approvalAmt: 900, supplierName: 'COGNIZANT TECHNOLOGY SOLUTIONS', hourly: '1', fixed: '0', personId: '92326749', informationId: ['01244911', '01709881', '92326749'],
//     workers: [{ hours: '0', dollars: '79.93', designatedCat: '', workerName: '' }, { hours: '0', dollars: '75.23', designatedCat: '', workerName: '' }, { hours: '0', dollars: '30.75', designatedCat: '', workerName: '' }, { hours: '0', dollars: '33.33', designatedCat: '', workerName: '' }, { hours: '0', dollars: '33.04', designatedCat: '', workerName: '' }, { hours: '0', dollars: '31.37', designatedCat: '', workerName: '' }, { hours: '0', dollars: '81.13', designatedCat: '', workerName: '' }],
//     account: [{ costCenter: '1000748051', distributionPercentage: '100', wbs: 'E-082380-E-002', account: '7385040', otherCharts: '' }]
//   },

//   {
//     rfeNo: '95554', projectTitle: 'Pioneer Rewards Phase 2', description: 'Program generated over $40 million annually of new sales through face to face selling at end users .3M leads in the market in sales recognition & this platform provides a means to ensure that one fundamental strategy is reinforced;new businessdevelopment.',
//     supplierNumber: '1605518', startDate: '04/30/2019 12:00:00 AM', completionDate: '', additionalExp: '9000', approvalAmt: 9000, supplierName: 'COGNIZANT TECHNOLOGY SOLUTIONS', hourly: '1', fixed: '0', personId: '92326749', informationId: ['01244911', '01709881', '92326749'],
//     workers: [{ hours: '0', dollars: '79.93', designatedCat: '', workerName: '' }, { hours: '0', dollars: '75.23', designatedCat: '', workerName: '' }, { hours: '0', dollars: '30.75', designatedCat: '', workerName: '' }, { hours: '0', dollars: '33.33', designatedCat: '', workerName: '' }, { hours: '0', dollars: '33.04', designatedCat: '', workerName: '' }, { hours: '0', dollars: '31.37', designatedCat: '', workerName: '' }, { hours: '0', dollars: '81.13', designatedCat: '', workerName: '' }],
//     account: [{ costCenter: '1000748051', distributionPercentage: '100', wbs: 'E-082380-E-002', account: '7385040', otherCharts: '' }]
//   },

//   {
//     rfeNo: '95555', projectTitle: 'Pioneer Rewards Phase 2', description: 'Program generated over $40 million annually of ne sales through face to face selling at end users .3M leads in the market in sales recognition & this platform provides a means to ensure that one fundamental strategy is reinforced;new businessdevelopment.',
//     supplierNumber: '1605518', startDate: '04/30/2019 12:00:00 AM', completionDate: '', additionalExp: '9000', approvalAmt: 90, supplierName: 'COGNIZANT TECHNOLOGY SOLUTIONS', hourly: '1', fixed: '0', personId: '92326749', informationId: ['01244911', '01709881', '92326749'],
//     workers: [{ hours: '0', dollars: '79.93', designatedCat: '', workerName: '' }, { hours: '0', dollars: '75.23', designatedCat: '', workerName: '' }, { hours: '0', dollars: '30.75', designatedCat: '', workerName: '' }, { hours: '0', dollars: '33.33', designatedCat: '', workerName: '' }, { hours: '0', dollars: '33.04', designatedCat: '', workerName: '' }, { hours: '0', dollars: '31.37', designatedCat: '', workerName: '' }, { hours: '0', dollars: '81.13', designatedCat: '', workerName: '' }],
//     account: [{ costCenter: '1000748051', distributionPercentage: '100', wbs: 'E-082380-E-002', account: '7385040', otherCharts: '' }]
//   },

// ];


