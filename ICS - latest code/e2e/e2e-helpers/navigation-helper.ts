import {browser} from 'protractor';

export class NavigationHelper {

  openAdminPage() {
    browser.get('/ics-app/admin');
  }

  openProgramOwnerPage() {
    browser.get('/ics-app/program-owner');
  }

  openSignUpPage() {
    browser.get('/ics-app/sign-up');
  }

  openMyAppointmentsPage() {
    browser.get('/ics-app/my-appointments');
  }
}
