import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  get(url, params?: any, options?: any) {
    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    // console.log("options from get: " + options);
    if (options) {
      header = options;
      if (options.headers.get('USERNAME') === null)
        options.headers.append('USERNAME', 'TESTUSER');
    }
    return this.http.get(environment.baseURL + url + this.queryString(params), { headers: header });
  }

  post(url, params?: any, options?: any) {
    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    // console.log("options from post: " + options);
    if (options) {
      header = options;
      if (options.headers.get('USERNAME') === null)
        options.headers.append('USERNAME', 'TESTUSER');
    }
    return this.http.post(environment.baseURL + url, JSON.stringify(params), { headers: header });
  }

  put(url, params?: any, options?: any) {
    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    if (options) {
      header = options;
      if (options.headers.get('USERNAME') === null)
        options.headers.append('USERNAME', 'TESTUSER');
    }
    return this.http.put(environment.baseURL + url, JSON.stringify(params), { headers: header });
  }

  delete(url, params?: any, options?: any) {
    return this.http.delete(environment.baseURL + url + this.queryString(params));
  }

  private queryString(jsonArray) {
    if (!jsonArray || jsonArray.length === 0) {
      return '';
    }
    const str = [];
    for (const p in jsonArray) {
      if (jsonArray.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(jsonArray[p]));
      }
    }
    if (str.length > 0) {
      return '?' + str.join('&');
    }
    return '';
  }

}
