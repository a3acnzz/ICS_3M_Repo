import {E2eHelpers} from '../../e2e-helpers/e2e-helpers';
import {NavigationHelper} from '../../e2e-helpers/navigation-helper';
import * as http from 'http';
import {browser, by, element} from 'protractor';
import * as format from 'date-fns/format/index';
import {AppConstant} from '../../../src/app/shared/app.constant';

describe('Sign Up - Email Optional', () => {
  const navigation: NavigationHelper = new NavigationHelper();
  const testData = require('../../config/testData.json');
  const signUpData = testData.signUp;
  const e2eHelpers: E2eHelpers = new E2eHelpers();

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowLinkText = format(tomorrowDate, AppConstant.angularFullDateFormat);

  // Use if needed - otherwise commented out for increased performance
  beforeAll(function () {
    http.get('http://localhost:8080/E2E/prepareSignUpEmailOptional');
  });
  //
  // beforeEach(() => {
  // });
  //
  // afterEach(() => {
  // });
  //
  afterAll(() => {
    http.get('http://localhost:8080/E2E/cleanupSignUpEmailOptional');
  });

  it('Navigate to sign-up page', () => {
    navigation.openSignUpPage();
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink('E2E - Sign Up - Email Optional');
    e2eHelpers.waitForBusyOverlay();
  });

  it('Check Program Validation with Email Required', () => {
    // Check that program date button is disabled before a program is selected
    const selectProgramDateBtn = element(by.id('selectDateTime-appointment-0'));
    expect(selectProgramDateBtn.isEnabled()).toBeFalsy();

    e2eHelpers.clickButton('selectProgram-appointment-0');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickPartialButtonText('E2E - Program - Email Required'); // button text also contains venue, so using partial match
    e2eHelpers.waitForDialogClose('app-program-select-dialog');

    e2eHelpers.clickButtonText('Submit');
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

  it('Check Program Validation with Email Optional', () => {
    // Check that program date button is disabled before a program is selected
    const selectProgramDateBtn = element(by.id('selectDateTime-appointment-0'));
    expect(selectProgramDateBtn.isEnabled()).toBeFalsy();

    e2eHelpers.clickButton('selectProgram-appointment-0');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickPartialButtonText('E2E - Program - Email Optional'); // button text also contains venue, so using partial match
    e2eHelpers.waitForDialogClose('app-program-select-dialog');

    e2eHelpers.clickButtonText('Submit');
    e2eHelpers.getElementText('programDateRequiredError').then(function (value) {
      expect(value).toBe(signUpData.programDateRequiredErrorMessage)
    });
    e2eHelpers.getElementText('startTimeDisplayRequiredError').then(function (value) {
      expect(value).toBe(signUpData.startTimeDisplayRequiredErrorMessage)
    });
    e2eHelpers.getElementText('endTimeDisplayRequiredError').then(function (value) {
      expect(value).toBe(signUpData.endTimeDisplayRequiredErrorMessage)
    });
    e2eHelpers.getElementText('firstNameRequiredError').then(function (value) {
      expect(value).toBe(signUpData.firstNameRequiredErrorMessage)
    });
    e2eHelpers.getElementText('lastNameRequiredError').then(function (value) {
      expect(value).toBe(signUpData.lastNameRequiredErrorMessage)
    });
    expect(browser.isElementPresent(by.id('emailAddressRequiredError'))).toBeFalsy();
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

  it('Sign up without using email', () => {
    e2eHelpers.clickButton('selectProgram-appointment-0');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickPartialButtonText('E2E - Program - Email Optional'); // button text also contains venue, so using partial match
    e2eHelpers.waitForDialogClose('app-program-select-dialog');

    e2eHelpers.clickButton('selectDateTime-appointment-0');
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.clickLink(tomorrowLinkText);
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.clickButton('select-program-date-0-time-slot-0'); // Select first time slot of first program date
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.waitForDialogClose('app-program-date-select-dialog');

    e2eHelpers.enterElementText('firstName-appointment-0', signUpData.searchUserFirstName);
    e2eHelpers.enterElementText('lastName-appointment-0', signUpData.searchUserLastName);

    e2eHelpers.clickButtonText('Submit');
    e2eHelpers.waitForBusyOverlay(); // Validation
    e2eHelpers.waitForBusyOverlay(); // Save

    e2eHelpers.getElementText('saveMessage').then(function (value) {
      expect(value).toContain(signUpData.submittedAppointmentMessage)
    });
  });

});
