import {E2eHelpers} from '../../e2e-helpers/e2e-helpers';
import {NavigationHelper} from '../../e2e-helpers/navigation-helper';
import * as http from 'http';
import * as format from 'date-fns/format/index.js';
import {AppConstant} from '../../../src/app/shared/app.constant';

describe('Manage Pending Appointment', () => {
  const navigation: NavigationHelper = new NavigationHelper();
  const e2eHelpers: E2eHelpers = new E2eHelpers();

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowLinkText = format(tomorrowDate, AppConstant.angularFullDateFormat);

  // Use if needed - otherwise commented out for increased performance
  beforeAll(function () {
    http.get('http://localhost:8080/E2E/prepareManagePendingAppointment');
  });
  //
  // beforeEach(() => {
  // });
  //
  // afterEach(() => {
  // });
  //
  afterAll(() => {
    http.get('http://localhost:8080/E2E/cleanupManagePendingAppointment');
  });

  it('Navigate to sign-up page', () => {
    navigation.openSignUpPage();
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink('E2E - Manage Pending Appointment');
    e2eHelpers.waitForBusyOverlay();
  });

  it('Select Program', () => {
    e2eHelpers.clickButton('selectProgram-appointment-0');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickPartialButtonText('E2E - Program'); // button text also contains venue, so using partial match
    e2eHelpers.waitForDialogClose('app-program-select-dialog');
  });

  it('Select Program Date and Time Slot', () => {
    e2eHelpers.clickButton('selectDateTime-appointment-0');
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.clickLink(tomorrowLinkText);
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.clickButton('select-program-date-0-time-slot-0'); // Select first time slot of first program date
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.waitForDialogClose('app-program-date-select-dialog');
  });

  it('Clear Pending Appointment', () => {
    e2eHelpers.clickLink('Program Owner');
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.clickLink('E2E - Manage Pending Appointment');
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.clickLink('E2E - Program');
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.clickButtonText('Actions');
    e2eHelpers.clickButtonText('Manage Pending Appointments');
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.getElementText('pending-0-appointment-date').then(function (value) {
      expect(value).toBe(tomorrowLinkText);
    });

    e2eHelpers.getElementText('pending-0-start-time').then(function (value) {
      expect(value).toBe('08:00 AM');
    });

    e2eHelpers.getElementText('pending-0-end-time').then(function (value) {
      expect(value).toBe('08:15 AM');
    });

    e2eHelpers.getElementText('pending-0-held-by-name').then(function (value) {
      expect(value).toBe('Admin Test');
    });

    e2eHelpers.clickButton('clear-pending-0');
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.getElementText('pendingAppointmentCleared').then(function (value) {
      expect(value).toBe('Pending appointment cleared');
    });

    e2eHelpers.getElementText('noPendingAppointmentsAlert').then(function (value) {
      expect(value).toBe('There are no pending appointments for this program');
    });

  });

});
