import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  private handleError<T>(response: any): Observable<T> {

    let errMsg = 'Server error';
    if (response && response.error) {
      errMsg = response.error.message || 'Server error';
    }
    return throwError(new Error(errMsg));
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

  get(url, params?: any, options?: any) {
    return this.http.get(environment.baseURL + url + this.queryString(params))
      .pipe(
        catchError(this.handleError)
      );
  }

  post(url, params?: any, options?: any) {
    return this.http.post(environment.baseURL + url, JSON.stringify(params))
      .pipe(
        catchError(this.handleError)
      );
  }

  put(url, params?: any, options?: any) {
    return this.http.put(environment.baseURL + url, JSON.stringify(params))
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(url, params?: any, options?: any) {
    return this.http.delete(environment.baseURL + url + this.queryString(params))
      .pipe(
        catchError(this.handleError)
      );
  }
}
