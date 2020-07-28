import {E2eHelpers} from '../../e2e-helpers/e2e-helpers';
import {NavigationHelper} from '../../e2e-helpers/navigation-helper';
import {browser, by} from 'protractor';
import * as http from 'http';

describe('System BCC emails', () => {
  const navigation: NavigationHelper = new NavigationHelper();
  const testData = require('../../config/testData.json');
  const bccEmailData = testData.bccEmails;
  const e2eHelpers: E2eHelpers = new E2eHelpers();

  // Use if needed - otherwise commented out for increased performance
  beforeAll(function () {
    http.get('http://localhost:8080/E2E/prepareSystemBccEmails');
  });
  //
  // beforeEach(() => {
  // });
  //
  // afterEach(() => {
  // });
  //
  afterAll(() => {
    http.get('http://localhost:8080/E2E/cleanupSystemBccEmails');
  });

  it('Navigate to admin page', () => {
    navigation.openAdminPage();
  });

  it('Test Validation Messages', () => {
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButtonText('Configure BCC Emails');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('dialogTitle').then(function(value) {
      expect(value).toContain(bccEmailData.systemDialogTitle);
    });
    e2eHelpers.clickButtonText('Add Email');
    e2eHelpers.clickButtonText('Save');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('alertMessage').then(function (value) {
      expect(value).toContain(bccEmailData.validationMessage);
    });
    e2eHelpers.getElementText('emailRequiredError').then(function (value) {
      expect(value).toContain(bccEmailData.emailRequiredErrorMessage);
    });
    e2eHelpers.getElementText('emailFormatError').then(function (value) {
      expect(value).toContain(bccEmailData.emailFormatErrorMessage);
    });

    // Enter invalid email
    e2eHelpers.enterElementText('email0', bccEmailData.invalidEmail); // email0 is the id of the first bcc email in the list
    e2eHelpers.clickButtonText('Save');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('alertMessage').then(function (value) {
      expect(value).toContain(bccEmailData.validationMessage);
    });
    e2eHelpers.getElementText('emailFormatError').then(function (value) {
      expect(value).toContain(bccEmailData.emailFormatErrorMessage);
    });

    e2eHelpers.clickButton('closeDialog');
    e2eHelpers.waitForDialogClose('app-bcc-email-dialog');
  });

  it('Add Email and Save', () => {
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButtonText('Configure BCC Emails');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButtonText('Add Email');
    e2eHelpers.enterElementText('email0', bccEmailData.misTestEmail); // email0 is the id of the first bcc email in the list
    e2eHelpers.clickButtonText('Save');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('alertMessage').then(function (value) {
      expect(value).toContain(bccEmailData.saveMessage);
    });
    e2eHelpers.clickButton('closeDialog');
    e2eHelpers.waitForDialogClose('app-bcc-email-dialog');
  });

  it('Open Bcc Emails dialog and check bcc email was saved', () => {
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButtonText('Configure BCC Emails');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementValue('email0').then(function (value) {
      expect(value).toBe(bccEmailData.misTestEmail);
    });
  });

  it('Check for duplicate emails', () => {
    e2eHelpers.clickButtonText('Add Email');
    e2eHelpers.enterElementText('email1', bccEmailData.misTestEmail); // email1 is the id of the second bcc email in the list
    e2eHelpers.clickButtonText('Save');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('alertMessage').then(function (value) {
      expect(value).toContain(bccEmailData.validationMessage);
    });
    e2eHelpers.getElementText('duplicatesError').then(function (value) {
      expect(value).toContain(bccEmailData.duplicatesErrorMessage);
    });
  });

  it('Add additional Bcc Email', () => {
    e2eHelpers.clearElementText('email1');
    e2eHelpers.enterElementText('email1', bccEmailData.occMedEmail); // email1 is the id of the second bcc email in the list
    e2eHelpers.clickButtonText('Save');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('alertMessage').then(function (value) {
      expect(value).toContain(bccEmailData.saveMessage);
    });
    e2eHelpers.clickButton('closeDialog');
    e2eHelpers.waitForDialogClose('app-bcc-email-dialog');
  });

  it('Open Bcc Emails dialog and check both bcc emails were saved', () => {
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButtonText('Configure BCC Emails');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementValue('email0').then(function (value) {
      expect(value).toBe(bccEmailData.misTestEmail);
    });
    e2eHelpers.getElementValue('email1').then(function (value) {
      expect(value).toBe(bccEmailData.occMedEmail);
    });
  });

  it('Delete Bcc Emails', () => {
    e2eHelpers.clickClass('fa-trash'); // Delete first bcc email
    e2eHelpers.clickClass('fa-trash'); // Delete second bcc email
    e2eHelpers.clickButtonText('Save');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('alertMessage').then(function (value) {
      expect(value).toContain(bccEmailData.saveMessage);
    });
    e2eHelpers.clickButton('closeDialog');
    e2eHelpers.waitForDialogClose('app-bcc-email-dialog');
  });

  it('Confirm Bcc Emails were deleted', () => {
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButtonText('Configure BCC Emails');
    e2eHelpers.waitForBusyOverlay().then(function (value) {
      expect(browser.isElementPresent(by.id('email0'))).toBeFalsy();
    });
  });
});
