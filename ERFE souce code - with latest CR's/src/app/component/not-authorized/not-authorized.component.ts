import {Component} from '@angular/core';

import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html'
})
export class NotAuthorizedComponent {

  homeUrl = environment.baseURL;
  /** Constructor for NotAuthorizedComponent
 * 
 */
  constructor() {
  }
}
