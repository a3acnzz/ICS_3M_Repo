import {E2eHelpers} from '../../e2e-helpers/e2e-helpers';
import {NavigationHelper} from '../../e2e-helpers/navigation-helper';
import * as http from 'http';
import * as format from 'date-fns/format/index.js';
import {AppConstant} from '../../../src/app/shared/app.constant';

describe('Manage Pending Appointment', () => {
  const navigation: NavigationHelper = new NavigationHelper();
  const e2eHelpers: E2eHelpers = new E2eHelpers();
  const testData = require('../../config/testData.json');
  const programAppointmentData = testData.programAppointments;

  let todayDate = new Date();
  const todayText = format(todayDate, AppConstant.angularFullDateFormat);

  let tomorrowDate = new Date().setDate(todayDate.getDate() + 1);
  const tomorrowText = format(tomorrowDate, AppConstant.angularFullDateFormat);

  let dayAfterDate = new Date().setDate(todayDate.getDate() + 2);
  const dayAfterText = format(dayAfterDate, AppConstant.angularFullDateFormat);

  let yesterdayDate = new Date().setDate(todayDate.getDate() - 1);
  const yesterdayText = format(yesterdayDate, AppConstant.angularFullDateFormat);

  let dayBeforeDate = new Date().setDate(todayDate.getDate() - 2);
  const dayBeforeText = format(dayBeforeDate, AppConstant.angularFullDateFormat);

  // Use if needed - otherwise commented out for increased performance
  beforeAll(function () {
    http.get('http://localhost:8080/E2E/prepareProgramAppointments');
  });
  //
  // beforeEach(() => {
  // });
  //
  // afterEach(() => {
  // });
  //
  afterAll(() => {
    http.get('http://localhost:8080/E2E/cleanupProgramAppointments');
  });

  it('Navigate to program', () => {
    navigation.openProgramOwnerPage();
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink('E2E - Program Appointments');
    e2eHelpers.waitForBusyOverlay();
  });

  it('View Appointments', () => {
    e2eHelpers.clickLink('E2E - Program');
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.clickButtonText('Actions');
    e2eHelpers.clickButtonText('View Program Appointments');
    e2eHelpers.waitForBusyOverlay();

    let i = 0;
    for (let appointment of programAppointmentData) {

      // Check that appointments are ordered by date and time, with past appointments at the end
      // Expected order: today, today, tomorrow, tomorrow + 1, yesterday -1, yesterday
      switch (i) {
        case 0: {
          e2eHelpers.getElementText('appointment-' + i + '-date').then(function (value) {
            expect(value).toBe(todayText);
          });
          break;
        }
        case 1: {
          e2eHelpers.getElementText('appointment-' + i + '-date').then(function (value) {
            expect(value).toBe(todayText);
          });
          break;
        }
        case 2: {
          e2eHelpers.getElementText('appointment-' + i + '-date').then(function (value) {
            expect(value).toBe(tomorrowText);
          });
          break;
        }
        case 3: {
          e2eHelpers.getElementText('appointment-' + i + '-date').then(function (value) {
            expect(value).toBe(dayAfterText);
          });
          break;
        }
        case 4: {
          e2eHelpers.getElementText('appointment-' + i + '-date').then(function (value) {
            expect(value).toBe(dayBeforeText);
          });
          break;
        }
        case 5: {
          e2eHelpers.getElementText('appointment-' + i + '-date').then(function (value) {
            expect(value).toBe(yesterdayText);
          });
          break;
        }
      }

      e2eHelpers.getElementText('appointment-' + i + '-start-time').then(function (value) {
        expect(value).toBe(appointment.startTime);
      });

      e2eHelpers.getElementText('appointment-' + i + '-end-time').then(function (value) {
        expect(value).toBe(appointment.endTime);
      });

      e2eHelpers.getElementText('appointment-' + i + '-name').then(function (value) {
        expect(value).toBe(appointment.name);
      });

      e2eHelpers.getElementText('appointment-' + i + '-pin').then(function (value) {
        expect(value).toBe(appointment.pin);
      });

      e2eHelpers.getElementText('appointment-' + i + '-email').then(function (value) {
        expect(value).toBe(appointment.email);
      });

      i++;
    }
  });

});
