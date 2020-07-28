import {E2eHelpers} from '../../e2e-helpers/e2e-helpers';
import {NavigationHelper} from '../../e2e-helpers/navigation-helper';
import * as http from 'http';
import * as format from 'date-fns/format/index.js';
import {AppConstant} from '../../../src/app/shared/app.constant';
import {browser, by, element, protractor} from 'protractor';

describe('Sign Up - Program', () => {
  const navigation: NavigationHelper = new NavigationHelper();
  const testData = require('../../config/testData.json');
  const signUpData = testData.signUp;
  const e2eHelpers: E2eHelpers = new E2eHelpers();

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowLinkText = format(tomorrowDate, AppConstant.angularFullDateFormat);

  const dayAfterTomorrowDate = new Date();
  dayAfterTomorrowDate.setDate(dayAfterTomorrowDate.getDate() + 2);
  const dayAfterTomorrowLinkText = format(dayAfterTomorrowDate, AppConstant.angularFullDateFormat);

  browser.driver.manage().window().maximize();

  // Use if needed - otherwise commented out for increased performance
  beforeAll(function () {
    http.get('http://localhost:8080/E2E/prepareSignUpProgram');
  });
  //
  // beforeEach(() => {
  // });
  //
  // afterEach(() => {
  // });
  //
  afterAll(() => {
    http.get('http://localhost:8080/E2E/cleanupSignUpProgram');
  });

  it('Navigate to sign-up page', () => {
    navigation.openSignUpPage();
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink('E2E - Sign Up - Program');
  });

  it('Open additional Sign-Up tab for later test', () => {
    e2eHelpers.waitForBusyOverlay();
    // Open New Sign-Up tab
    const elm = element(by.linkText('Sign Up'));
    browser.actions()
      .mouseMove(elm)
      .keyDown(protractor.Key.CONTROL)
      .click()
      .perform();

    // Uh... stop pressing the control key, Protractor...
    browser.actions()
      .keyUp(protractor.Key.CONTROL)
      .perform();
  });

  it('Check validation messages', () => {
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButtonText('Submit');
    e2eHelpers.getElementText('programRequiredError').then(function (value) {
      expect(value).toBe(signUpData.programRequiredErrorMessage)
    });
    e2eHelpers.getElementText('programDateRequiredError').then(function (value) {
      expect(value).toBe(signUpData.programDateRequiredErrorMessage)
    });
    e2eHelpers.getElementText('startTimeDisplayRequiredError').then(function (value) {
      expect(value).toBe(signUpData.startTimeDisplayRequiredErrorMessage)
    });
    e2eHelpers.getElementText('endTimeDisplayRequiredError').then(function (value) {
      expect(value).toBe(signUpData.endTimeDisplayRequiredErrorMessage)
    });
    e2eHelpers.getElementText('emailAddressRequiredError').then(function (value) {
      expect(value).toBe(signUpData.emailAddressRequiredErrorMessage)
    });
    e2eHelpers.getElementText('firstNameRequiredError').then(function (value) {
      expect(value).toBe(signUpData.firstNameRequiredErrorMessage)
    });
    e2eHelpers.getElementText('lastNameRequiredError').then(function (value) {
      expect(value).toBe(signUpData.lastNameRequiredErrorMessage)
    });
  });

  it('Clear validation messages', () => {
    e2eHelpers.clickButtonText('Clear').then(function () {
      expect(browser.isElementPresent(by.id('programRequiredError'))).toBeFalsy();
      expect(browser.isElementPresent(by.id('programDateRequiredError'))).toBeFalsy();
      expect(browser.isElementPresent(by.id('startTimeDisplayRequiredError'))).toBeFalsy();
      expect(browser.isElementPresent(by.id('endTimeDisplayRequiredError'))).toBeFalsy();
      expect(browser.isElementPresent(by.id('emailAddressRequiredError'))).toBeFalsy();
      expect(browser.isElementPresent(by.id('firstNameRequiredError'))).toBeFalsy();
      expect(browser.isElementPresent(by.id('lastNameRequiredError'))).toBeFalsy();
    });
  });

  it('Select Program', () => {
    // Check that step 1 instructions to select a program are displayed
    e2eHelpers.getElementText('appointment-0-step1-msg').then(function (value) {
      expect(value).toBe(signUpData.step1Message);
    });

    // Check that program date button is disabled before a program is selected
    const selectProgramDateBtn = element(by.id('selectDateTime-appointment-0'));
    expect(selectProgramDateBtn.isEnabled()).toBeFalsy();

    e2eHelpers.clickButton('selectProgram-appointment-0');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickPartialButtonText('E2E - Program'); // button text also contains venue, so using partial match
    e2eHelpers.waitForDialogClose('app-program-select-dialog');

    e2eHelpers.getElementValue('programName-appointment-0').then(function (value) {
      expect(value).toBe('E2E - Program');
    });

    e2eHelpers.getElementValue('programVenue-appointment-0').then(function (value) {
      expect(value).toBe('E2E Test');
    });
  });

  it('Display Program Dates and Time Slots', () => {
    // Check that step 2 instructions to select a program date are displayed
    e2eHelpers.getElementText('appointment-0-step2-msg').then(function (value) {
      expect(value).toBe(signUpData.step2Message);
    });

    e2eHelpers.clickButton('selectDateTime-appointment-0');
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.clickLink(tomorrowLinkText);
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.getElementText('program-date-0-time-slot-0-start-time').then(function (value) {
      expect(value).toBe('08:00 AM');
    });

    e2eHelpers.getElementText('program-date-0-time-slot-0-end-time').then(function (value) {
      expect(value).toBe('08:15 AM');
    });

    e2eHelpers.getElementText('program-date-0-time-slot-0-available').then(function (value) {
      expect(value).toBe('1');
    });

    e2eHelpers.getElementText('program-date-0-time-slot-1-start-time').then(function (value) {
      expect(value).toBe('08:15 AM');
    });

    e2eHelpers.getElementText('program-date-0-time-slot-1-end-time').then(function (value) {
      expect(value).toBe('08:30 AM');
    });

    e2eHelpers.getElementText('program-date-0-time-slot-1-available').then(function (value) {
      expect(value).toBe('1');
    });
  });

  it('Select Program Date and Time Slot', () => {
    e2eHelpers.clickButton('select-program-date-0-time-slot-0'); // Select first time slot of first program date
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.waitForDialogClose('app-program-date-select-dialog');

    e2eHelpers.getElementValue('programDate-appointment-0').then(function (value) {
      expect(value).toBe(format(tomorrowDate, AppConstant.fullDateFormat));
    });

    e2eHelpers.getElementValue('startTime-appointment-0').then(function (value) {
      expect(value).toBe('08:00 AM');
    });

    e2eHelpers.getElementValue('endTime-appointment-0').then(function (value) {
      expect(value).toBe('08:15 AM');
    });
  });

  it('Selected Time Slot with Max Capacity of 1 is not shown', () => {
    e2eHelpers.clickButton('selectDateTime-appointment-0');
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.clickLink(tomorrowLinkText);
    e2eHelpers.waitForBusyOverlay().then(function () {
      expect(browser.isElementPresent(by.id('select-program-date-0-time-slot-0'))).toBeFalsy();
    });
  });

  it('Display Time Slots for next program date', () => {
    e2eHelpers.clickLink(dayAfterTomorrowLinkText);
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.getElementText('program-date-1-time-slot-0-start-time').then(function (value) {
      expect(value).toBe('08:00 AM');
    });

    e2eHelpers.getElementText('program-date-1-time-slot-0-end-time').then(function (value) {
      expect(value).toBe('08:15 AM');
    });

    e2eHelpers.getElementText('program-date-1-time-slot-0-available').then(function (value) {
      expect(value).toBe('5');
    });

    e2eHelpers.getElementText('program-date-1-time-slot-1-start-time').then(function (value) {
      expect(value).toBe('08:15 AM');
    });

    e2eHelpers.getElementText('program-date-1-time-slot-1-end-time').then(function (value) {
      expect(value).toBe('08:30 AM');
    });

    e2eHelpers.getElementText('program-date-1-time-slot-1-available').then(function (value) {
      expect(value).toBe('5');
    });
  });

  it('Change Program Date and Time Slot', () => {
    e2eHelpers.clickButton('select-program-date-1-time-slot-1'); // Select first time slot of first program date
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.waitForDialogClose('app-program-date-select-dialog');

    e2eHelpers.getElementValue('programDate-appointment-0').then(function (value) {
      expect(value).toBe(format(dayAfterTomorrowDate, AppConstant.fullDateFormat));
    });

    e2eHelpers.getElementValue('startTime-appointment-0').then(function (value) {
      expect(value).toBe('08:15 AM');
    });

    e2eHelpers.getElementValue('endTime-appointment-0').then(function (value) {
      expect(value).toBe('08:30 AM');
    });
  });

  it('Previously Selected Time Slot with Max Capacity of 1 is shown after change', () => {
    e2eHelpers.clickButton('selectDateTime-appointment-0');
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.clickLink(tomorrowLinkText);
    e2eHelpers.waitForBusyOverlay().then(function () {
      expect(browser.isElementPresent(by.id('select-program-date-0-time-slot-0'))).toBeTruthy();
    });
  });

  it('Selected Time Slot Max Capacity is decremented after change', () => {
    const nextDayLinkText = format(dayAfterTomorrowDate, AppConstant.angularFullDateFormat);
    e2eHelpers.clickLink(nextDayLinkText);
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.getElementText('program-date-1-time-slot-0-start-time').then(function (value) {
      expect(value).toBe('08:00 AM');
    });

    e2eHelpers.getElementText('program-date-1-time-slot-0-end-time').then(function (value) {
      expect(value).toBe('08:15 AM');
    });

    e2eHelpers.getElementText('program-date-1-time-slot-0-available').then(function (value) {
      expect(value).toBe('5');
    });

    e2eHelpers.getElementText('program-date-1-time-slot-1-start-time').then(function (value) {
      expect(value).toBe('08:15 AM');
    });

    e2eHelpers.getElementText('program-date-1-time-slot-1-end-time').then(function (value) {
      expect(value).toBe('08:30 AM');
    });

    e2eHelpers.getElementText('program-date-1-time-slot-1-available').then(function (value) {
      expect(value).toBe('4');
    });

    e2eHelpers.clickButton('closeDialog');
    e2eHelpers.waitForDialogClose('app-program-date-select-dialog');
  });

  it('Enter invalid user pin', () => {
    e2eHelpers.enterElementText('pin-appointment-0', 'ASDFGHJKL');
    browser.actions().sendKeys(protractor.Key.TAB).perform();
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('userPinWarning').then(function (value) {
      expect(value).toBe(signUpData.userPinWarningMessage);
    });
  });

  it('Clear invalid user pin warning', () => {
    e2eHelpers.clearElementText('pin-appointment-0');
    e2eHelpers.enterElementText('pin-appointment-0', ' ');
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();
    expect(browser.isElementPresent(by.id('userPinWarning'))).toBeFalsy();
  });

  it('Select user via search', () => {
    // Check that step 3 instructions to enter information are displayed
    e2eHelpers.getElementText('appointment-0-step3-msg').then(function (value) {
      expect(value).toBe(signUpData.step3Message);
    });

    e2eHelpers.clickButton('selectUserPin-appointment-0');
    e2eHelpers.waitForAutoFocus();
    e2eHelpers.enterElementText('userPin', signUpData.searchUserPin);
    e2eHelpers.clickButton('userSearchButton');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButtonText('Select');
    e2eHelpers.waitForDialogClose('app-user-search-dialog');

    e2eHelpers.getElementValue('pin-appointment-0').then(function (value) {
      expect(value).toBe(signUpData.searchUserPin)
    });
    e2eHelpers.getElementValue('emailAddress-appointment-0').then(function (value) {
      expect(value).toBe(signUpData.searchUserEmail)
    });
    e2eHelpers.getElementValue('firstName-appointment-0').then(function (value) {
      expect(value).toBe(signUpData.searchUserFirstName)
    });
    e2eHelpers.getElementValue('lastName-appointment-0').then(function (value) {
      expect(value).toBe(signUpData.searchUserLastName)
    });
  });

  it('Submit Appointment', () => {
    // Check that step 4 instructions to submit appointment are displayed
    e2eHelpers.getElementText('appointment-0-step4-msg').then(function (value) {
      expect(value).toBe(signUpData.step4Message);
    });

    e2eHelpers.clickButtonText('Submit');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('saveMessage').then(function (value) {
      expect(value).toContain(signUpData.submittedAppointmentMessage)
    });
  });

  it('Check that time slot cannot be overbooked', () => {
    // Open timeslot dialog in first browser tab
    e2eHelpers.clickButton('selectProgram-appointment-0');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickPartialButtonText('E2E - Program');
    e2eHelpers.waitForDialogClose('app-program-select-dialog');

    e2eHelpers.clickButton('selectDateTime-appointment-0');
    e2eHelpers.waitForBusyOverlay();
    const tomorrowLinkTest = format(tomorrowDate, AppConstant.angularFullDateFormat);
    e2eHelpers.clickLink(tomorrowLinkTest);

    // Reserve timeslot in second browser window
    browser.getAllWindowHandles().then(function (allGUID) { // Get all tab GUIDs
      browser.switchTo().window(allGUID[1]); // Switch to second tab
      browser.waitForAngular();
      e2eHelpers.waitForBusyOverlay();
      e2eHelpers.clickLink('E2E - Sign Up - Program');
      e2eHelpers.waitForBusyOverlay();
      e2eHelpers.clickButton('selectProgram-appointment-0');
      e2eHelpers.waitForBusyOverlay();
      e2eHelpers.clickPartialButtonText('E2E - Program'); // button text also contains venue, so using partial match
      e2eHelpers.waitForDialogClose('app-program-select-dialog');
      e2eHelpers.clickButton('selectDateTime-appointment-0');
      e2eHelpers.waitForBusyOverlay();
      e2eHelpers.clickLink(tomorrowLinkTest);
      e2eHelpers.waitForBusyOverlay();
      e2eHelpers.clickButton('select-program-date-0-time-slot-0');
      e2eHelpers.waitForBusyOverlay();
      e2eHelpers.waitForDialogClose('app-program-date-select-dialog');
      browser.close().then(function () { // Close second browser tab
        browser.switchTo().window(allGUID[0]); // Switch control to first tab
        // Reserve timeslot in first browser window, expect error message
        e2eHelpers.waitForBusyOverlay();
        e2eHelpers.clickButton('select-program-date-0-time-slot-0'); // Select first time slot of first program date
        e2eHelpers.getElementText('timeSlotFilledAlert').then(function (value) {
          expect(value).toContain(signUpData.timeSlotFilledAlertMessage)
        });
      });
    });
  });

  it('Check that duplicate appointment cannot be booked', () => {
    e2eHelpers.waitForBusyOverlay();
    const tomorrowLinkTest = format(tomorrowDate, AppConstant.angularFullDateFormat);
    e2eHelpers.clickLink(tomorrowLinkTest);
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('select-program-date-0-time-slot-1');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.waitForDialogClose('app-program-date-select-dialog');
    e2eHelpers.enterElementText('emailAddress-appointment-0', signUpData.searchUserEmail);
    e2eHelpers.enterElementText('firstName-appointment-0', signUpData.searchUserFirstName);
    e2eHelpers.enterElementText('lastName-appointment-0', signUpData.searchUserLastName);
    e2eHelpers.clickButtonText('Submit');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('invalidAppointmentAlert').then(function (value) {
      expect(value).toContain(signUpData.invalidAppointmentAlertMessage)
    });
  });

  it('Check that multiple appointments can be booked', () => {
    e2eHelpers.clickButtonText('Clear');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('selectProgram-appointment-0');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickPartialButtonText('E2E - Program'); // button text also contains venue, so using partial match
    e2eHelpers.waitForDialogClose('app-program-select-dialog');

    e2eHelpers.clickButton('selectDateTime-appointment-0');
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.clickLink(dayAfterTomorrowLinkText);
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.clickButton('select-program-date-1-time-slot-1'); // Select first time slot of first program date
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.waitForDialogClose('app-program-date-select-dialog');

    e2eHelpers.enterElementText('emailAddress-appointment-0', signUpData.searchUserEmail);
    e2eHelpers.enterElementText('firstName-appointment-0', signUpData.searchUserFirstName + ' 1');
    e2eHelpers.enterElementText('lastName-appointment-0', signUpData.searchUserLastName + ' 1');

    // Force Protractor to scroll to bottom of page
    browser.executeScript('window.scrollTo(0,document.body.scrollHeight)');

    // Add second appointment
    e2eHelpers.clickButtonText('Add Additional Appointment');

    // Force Protractor to scroll to bottom of page
    browser.executeScript('window.scrollTo(0,document.body.scrollHeight)');

    e2eHelpers.clickButton('selectProgram-appointment-1');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickPartialButtonText('E2E - Program'); // button text also contains venue, so using partial match
    e2eHelpers.waitForDialogClose('app-program-select-dialog');

    e2eHelpers.clickButton('selectDateTime-appointment-1');
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.clickLink(dayAfterTomorrowLinkText);
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.clickButton('select-program-date-1-time-slot-1'); // Select first time slot of first program date
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.waitForDialogClose('app-program-date-select-dialog');

    e2eHelpers.enterElementText('emailAddress-appointment-1', signUpData.searchUserEmail);
    e2eHelpers.enterElementText('firstName-appointment-1', signUpData.searchUserFirstName + ' 2');
    e2eHelpers.enterElementText('lastName-appointment-1', signUpData.searchUserLastName + ' 2');

    e2eHelpers.clickButtonText('Submit');
    e2eHelpers.waitForBusyOverlay(); // Validation
    e2eHelpers.waitForBusyOverlay(); // Save

    e2eHelpers.getElementText('saveMessage').then(function (value) {
      expect(value).toContain(signUpData.submittedAppointmentMessage)
    });
  });

  it('Navigate to My Appointments Page after Sign-Ups', () => {
    e2eHelpers.clickLink('My Appointments');
    e2eHelpers.waitForBusyOverlay();

    // Check first appointment
    e2eHelpers.getElementText('appointment-0-programName').then(function (value) {
      expect(value).toBe('E2E - Program')
    });
    e2eHelpers.getElementText('appointment-0-programDate').then(function (value) {
      expect(value).toBe(format(dayAfterTomorrowDate, AppConstant.angularFullDateFormat))
    });
    e2eHelpers.getElementText('appointment-0-startTime').then(function (value) {
      expect(value).toBe('08:15 AM')
    });
    e2eHelpers.getElementText('appointment-0-endTime').then(function (value) {
      expect(value).toBe('08:30 AM')
    });
    e2eHelpers.getElementText('appointment-0-venue').then(function (value) {
      expect(value).toBe('E2E Test')
    });
    e2eHelpers.getElementText('appointment-0-name').then(function (value) {
      expect(value).toBe(signUpData.searchUserFirstName + ' ' + signUpData.searchUserLastName)
    });
    e2eHelpers.getElementText('appointment-0-createdByName').then(function (value) {
      expect(value).toBe(signUpData.searchUserFirstName + ' ' + signUpData.searchUserLastName)
    });

    // Check second appointment
    e2eHelpers.getElementText('appointment-1-programName').then(function (value) {
      expect(value).toBe('E2E - Program')
    });
    e2eHelpers.getElementText('appointment-1-programDate').then(function (value) {
      expect(value).toBe(format(dayAfterTomorrowDate, AppConstant.angularFullDateFormat))
    });
    e2eHelpers.getElementText('appointment-1-startTime').then(function (value) {
      expect(value).toBe('08:15 AM')
    });
    e2eHelpers.getElementText('appointment-1-endTime').then(function (value) {
      expect(value).toBe('08:30 AM')
    });
    e2eHelpers.getElementText('appointment-1-venue').then(function (value) {
      expect(value).toBe('E2E Test')
    });
    e2eHelpers.getElementText('appointment-1-name').then(function (value) {
      expect(value).toBe(signUpData.searchUserFirstName + ' 1 ' + signUpData.searchUserLastName + ' 1')
    });
    e2eHelpers.getElementText('appointment-1-createdByName').then(function (value) {
      expect(value).toBe(signUpData.searchUserFirstName + ' ' + signUpData.searchUserLastName)
    });

    // Check third appointment
    e2eHelpers.getElementText('appointment-2-programName').then(function (value) {
      expect(value).toBe('E2E - Program')
    });
    e2eHelpers.getElementText('appointment-2-programDate').then(function (value) {
      expect(value).toBe(format(dayAfterTomorrowDate, AppConstant.angularFullDateFormat))
    });
    e2eHelpers.getElementText('appointment-2-startTime').then(function (value) {
      expect(value).toBe('08:15 AM')
    });
    e2eHelpers.getElementText('appointment-2-endTime').then(function (value) {
      expect(value).toBe('08:30 AM')
    });
    e2eHelpers.getElementText('appointment-2-venue').then(function (value) {
      expect(value).toBe('E2E Test')
    });
    e2eHelpers.getElementText('appointment-2-name').then(function (value) {
      expect(value).toBe(signUpData.searchUserFirstName + ' 2 ' + signUpData.searchUserLastName + ' 2')
    });
    e2eHelpers.getElementText('appointment-2-createdByName').then(function (value) {
      expect(value).toBe(signUpData.searchUserFirstName + ' ' + signUpData.searchUserLastName)
    });
  });

  it('Cancel Appointment', () => {
    e2eHelpers.clickButton('cancel-appointment-2');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('confirm');
    e2eHelpers.clickButton('cancel-appointment');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.waitForDialogClose('app-appointment-cancellation-dialog');
    e2eHelpers.getElementText('appointmentCancelledAlert').then(function (value) {
      expect(value).toContain(signUpData.appointmentCancelledAlertMessage)
    });
    // Appointment is no longer listed
    expect(browser.isElementPresent(by.id('appointment-2-programName'))).toBeFalsy();
  });

  it('Reschedule Appointment', () => {
    e2eHelpers.clickButton('reschedule-appointment-1');
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.clickLink(dayAfterTomorrowLinkText);
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.clickButton('select-program-date-1-time-slot-0'); // Select first time slot of second program date
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.waitForDialogClose('app-program-date-select-dialog');

    // Check second appointment
    e2eHelpers.getElementText('appointment-1-programName').then(function (value) {
      expect(value).toBe('E2E - Program')
    });
    e2eHelpers.getElementText('appointment-1-programDate').then(function (value) {
      expect(value).toBe(format(dayAfterTomorrowDate, AppConstant.angularFullDateFormat))
    });
    e2eHelpers.getElementText('appointment-1-startTime').then(function (value) {
      expect(value).toBe('08:00 AM')
    });
    e2eHelpers.getElementText('appointment-1-endTime').then(function (value) {
      expect(value).toBe('08:15 AM')
    });
    e2eHelpers.getElementText('appointment-1-venue').then(function (value) {
      expect(value).toBe('E2E Test')
    });
    e2eHelpers.getElementText('appointment-1-name').then(function (value) {
      expect(value).toBe(signUpData.searchUserFirstName + ' 1 ' + signUpData.searchUserLastName + ' 1')
    });
    e2eHelpers.getElementText('appointment-1-createdByName').then(function (value) {
      expect(value).toBe(signUpData.searchUserFirstName + ' ' + signUpData.searchUserLastName)
    });

    e2eHelpers.getElementText('appointmentRescheduledAlert').then(function (value) {
      expect(value).toContain(signUpData.appointmentRescheduledAlertMessage)
    });
  });

  it('Cancel All Appointments', () => {
    e2eHelpers.clickButton('cancel-appointment-1');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('confirm');
    e2eHelpers.clickButton('cancel-appointment');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.waitForDialogClose('app-appointment-cancellation-dialog');

    e2eHelpers.clickButton('cancel-appointment-0');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('confirm');
    e2eHelpers.clickButton('cancel-appointment');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.waitForDialogClose('app-appointment-cancellation-dialog');

    e2eHelpers.getElementText('noAppointmentsAlert').then(function (value) {
      expect(value).toContain(signUpData.noAppointmentsAlertMessage)
    });
  });
});
