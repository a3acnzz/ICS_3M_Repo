import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ShareService {

  public isValidNumber(value) {
    if (value != null) {
      if (typeof value === 'string') {
        if (value.length > 0) {
          return +value > -1;
        }
      } else if (typeof value === 'number') {
        return value > -1;
      }
    }
    return false;
  }

}
