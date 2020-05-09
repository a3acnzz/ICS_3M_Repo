import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import {environment} from '../../../environments/environment';
import { Http, Response, ResponseContentType } from '@angular/http'; 
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  
    reqBody:any;
    constructor(private http: Http) {}


// downloadFile(path): Observable<any>{
//     var formData: FormData = new FormData();
//     formData.append('filePath',path);
//     let options = new RequestOptions({ responseType: ResponseContentType.Blob });
//     return this.http.post(environment.APIURL + "api/downloadfile",formData,options)
//   }

//   deleteFile(id){
//     return this.http.get(environment.APIURL + "api/deletefile/" + id ).map(
//       (response) => response.text()
//     )
//   }

  
uploadDoc(ReportForm, files:File[]) {
    this.reqBody = ReportForm;
    var formData: FormData = new FormData();
    formData.append('report',JSON.stringify(this.reqBody.value));
    var count: number = 0;
    for(let file of files){
      formData.append('uploadfile',file, file.name);
    } 
    // return this.http.post(environment.APIURL + "api/report", formData); 
    return this.http.post(environment.baseURL + "api/report", formData).pipe(map((response) => response.text()));
  }
  

}