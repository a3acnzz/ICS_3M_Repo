import {Component} from '@angular/core';
// Import authguard service so we can show a loading spinner during login
import {AuthGuardService} from './service/base/auth.guard.service';
import {Subscription} from 'rxjs';
import {AppConstant} from './shared/app.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Create a busy object to display in the login spinner
  busyLogin = new Subscription();
  authGuard;
  loginMessage = AppConstant.LOGIN_MESSAGE;

  // Inject AuthGuard service here
  constructor(private authGuardService: AuthGuardService) {
    this.authGuard = authGuardService;
  }
}
