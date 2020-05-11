import {E2eHelpers} from '../../e2e-helpers/e2e-helpers';
import {NavigationHelper} from '../../e2e-helpers/navigation-helper';
import * as http from 'http';
import {browser, protractor} from 'protractor';

describe('Email Templates', () => {
  const navigation: NavigationHelper = new NavigationHelper();
  const testData = require('../../config/testData.json');
  const emailTemplateData = testData.emailTemplates;
  const e2eHelpers: E2eHelpers = new E2eHelpers();

  // Use if needed - otherwise commented out for increased performance
  beforeAll(function () {
    http.get('http://localhost:8080/E2E/prepareEmailTemplates');
  });
  //
  // beforeEach(() => {
  // });
  //
  // afterEach(() => {
  // });
  //
  afterAll(() => {
    http.get('http://localhost:8080/E2E/cleanupEmailTemplates');
  });

  it('Navigate to admin page', () => {
    navigation.openAdminPage();
  });

  it('Test system-level validation', () => {
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButtonText('Configure Email Templates');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('dialogTitle').then(function (value) {
      expect(value).toContain(emailTemplateData.systemDialogTitle);
    });
    e2eHelpers.clickButtonText('Save');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.waitForAutoFocus();

    // Check for top and bottom error messages
    e2eHelpers.getElementText('validationErrorMessage_top').then(function (value) {
      expect(value).toContain(emailTemplateData.validationErrorMessage);
    });

    e2eHelpers.getElementText('validationErrorMessage_bottom').then(function (value) {
      expect(value).toBe(emailTemplateData.validationErrorMessage);
    });

    // Check for system-level confirmation and cancellation subject and message
    e2eHelpers.getElementText('system_confirmation_subjectRequiredError').then(function (value) {
      expect(value).toBe(emailTemplateData.systemSubjectRequiredErrorMessage);
    });

    e2eHelpers.getElementText('system_confirmation_messageRequiredError').then(function (value) {
      expect(value).toBe(emailTemplateData.systemMessageRequiredErrorMessage);
    });

    e2eHelpers.getElementText('system_cancellation_subjectRequiredError').then(function (value) {
      expect(value).toBe(emailTemplateData.systemSubjectRequiredErrorMessage);
    });

    e2eHelpers.getElementText('system_cancellation_messageRequiredError').then(function (value) {
      expect(value).toBe(emailTemplateData.systemMessageRequiredErrorMessage);
    });
  });

  it('Test system email body max length validation ', () => {

    // Enter system confirmation message in text editor
    e2eHelpers.enterEditorText('system_confirmation_message', 'The quick brown fox jumped over the lazy brown dog. ');

    // Copying and pasting the message is faster than having protractor type it out 40 times :)
    // Copy message in text editor
    browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('a').perform();
    browser.actions().keyUp(protractor.Key.CONTROL).perform();
    browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('c').perform();
    browser.actions().keyUp(protractor.Key.CONTROL).perform();

    // Paste message in text editor
    for (let i = 0; i < 40; i++) {
      browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('v').perform();
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    }

    // Check system confirmation email length validation message
    e2eHelpers.getElementText('system_confirmation_messageLengthError').then(function (value) {
      expect(value).toContain(emailTemplateData.messageLengthErrorMessage);
    });

    // Clear system confirmation email message
    e2eHelpers.clearEditorText('system_confirmation_message');

    // Enter system cancellation message in text editor
    e2eHelpers.enterEditorText('system_cancellation_message', 'The quick brown fox jumped over the lazy brown dog. ');

    // Paste message in text editor - this is still on the clipboard from before :)
    for (let i = 0; i < 40; i++) {
      browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('v').perform();
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    }

    // Check system cancellation email length validation message
    e2eHelpers.getElementText('system_cancellation_messageLengthError').then(function (value) {
      expect(value).toContain(emailTemplateData.messageLengthErrorMessage);
    });

    // Clear system cancellation email message
    e2eHelpers.clearEditorText('system_cancellation_message');
  });

  it('Create system templates', () => {
    // Enter confirmation email template subject + message
    e2eHelpers.enterElementText('system_confirmation_subject', emailTemplateData.systemConfirmationSubject);
    e2eHelpers.enterEditorText('system_confirmation_message', emailTemplateData.systemConfirmationMessage);

    // Enter cancellation email template subject + message
    e2eHelpers.enterElementText('system_cancellation_subject', emailTemplateData.systemCancellationSubject);
    e2eHelpers.enterEditorText('system_cancellation_message', emailTemplateData.systemCancellationMessage);

    // Save and check for save message
    e2eHelpers.clickButtonText('Save');
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.getElementText('saveMessage_top').then(function (value) {
      expect(value).toContain(emailTemplateData.saveMessage);
    });
    e2eHelpers.getElementText('saveMessage_bottom').then(function (value) {
      expect(value).toContain(emailTemplateData.saveMessage);
    });

    e2eHelpers.clickButton('closeDialog');
    e2eHelpers.waitForDialogClose('app-email-template-dialog');
  });

  it('Confirm system templates were saved correctly', () => {
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButtonText('Configure Email Templates');
    e2eHelpers.waitForBusyOverlay();

    // Confirm email subjects and messages
    e2eHelpers.getElementValue('system_confirmation_subject').then(function (value) {
      expect(value).toContain(emailTemplateData.systemConfirmationSubject);
    });

    e2eHelpers.getEditorText('system_confirmation_message').then(function (value) {
      expect(value).toContain(emailTemplateData.systemConfirmationMessage);
    });

    e2eHelpers.getElementValue('system_cancellation_subject').then(function (value) {
      expect(value).toContain(emailTemplateData.systemCancellationSubject);
    });

    e2eHelpers.getEditorText('system_cancellation_message').then(function (value) {
      expect(value).toContain(emailTemplateData.systemCancellationMessage);
    });

    e2eHelpers.clickButton('closeDialog');
    e2eHelpers.waitForDialogClose('app-email-template-dialog');
  });

  it('Navigate to location', () => {
    e2eHelpers.clickLink('Program Owner');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink('E2E - Email Templates');
    e2eHelpers.waitForBusyOverlay();
  });

  it('Confirm system templates display correctly at location level', () => {
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButtonText('Configure Email Templates');
    e2eHelpers.waitForBusyOverlay();

    // Confirm email subjects and messages
    e2eHelpers.getElementValue('system_confirmation_subject').then(function (value) {
      expect(value).toContain(emailTemplateData.systemConfirmationSubject);
    });

    e2eHelpers.getEditorText('system_confirmation_message').then(function (value) {
      expect(value).toContain(emailTemplateData.systemConfirmationMessage);
    });

    e2eHelpers.getElementValue('system_cancellation_subject').then(function (value) {
      expect(value).toContain(emailTemplateData.systemCancellationSubject);
    });

    e2eHelpers.getEditorText('system_cancellation_message').then(function (value) {
      expect(value).toContain(emailTemplateData.systemCancellationMessage);
    });
  });

  it('Save email templates at location level', () => {
    // Enter confirmation email template subject + message
    e2eHelpers.enterElementText('location_confirmation_subject', emailTemplateData.locationConfirmationSubject);
    e2eHelpers.enterEditorText('location_confirmation_message', emailTemplateData.locationConfirmationMessage);

    // Enter cancellation email template subject + message
    e2eHelpers.enterElementText('location_cancellation_subject', emailTemplateData.locationCancellationSubject);
    e2eHelpers.enterEditorText('location_cancellation_message', emailTemplateData.locationCancellationMessage);

    // Save and check for save message
    e2eHelpers.clickButtonText('Save');
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.getElementText('saveMessage_top').then(function (value) {
      expect(value).toContain(emailTemplateData.saveMessage);
    });
    e2eHelpers.getElementText('saveMessage_bottom').then(function (value) {
      expect(value).toContain(emailTemplateData.saveMessage);
    });

    // Confirm email subjects and messages
    e2eHelpers.getElementValue('location_confirmation_subject').then(function (value) {
      expect(value).toContain(emailTemplateData.locationConfirmationSubject);
    });

    e2eHelpers.getEditorText('location_confirmation_message').then(function (value) {
      expect(value).toContain(emailTemplateData.locationConfirmationMessage);
    });

    e2eHelpers.getElementValue('location_cancellation_subject').then(function (value) {
      expect(value).toContain(emailTemplateData.locationCancellationSubject);
    });

    e2eHelpers.getEditorText('location_cancellation_message').then(function (value) {
      expect(value).toContain(emailTemplateData.locationCancellationMessage);
    });

    e2eHelpers.clickButton('closeDialog');
    e2eHelpers.waitForDialogClose('app-email-template-dialog');
  });

  it('Navigate to Program', () => {
    e2eHelpers.clickLink('E2E - Program - Email Templates');
    e2eHelpers.waitForBusyOverlay();
  });

  it('Confirm system and location templates at program level', () => {
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButtonText('Configure Email Templates');
    e2eHelpers.waitForBusyOverlay();

    // Confirm email subjects and messages
    e2eHelpers.getElementValue('system_confirmation_subject').then(function (value) {
      expect(value).toContain(emailTemplateData.systemConfirmationSubject);
    });

    e2eHelpers.getEditorText('system_confirmation_message').then(function (value) {
      expect(value).toContain(emailTemplateData.systemConfirmationMessage);
    });

    e2eHelpers.getElementValue('system_cancellation_subject').then(function (value) {
      expect(value).toContain(emailTemplateData.systemCancellationSubject);
    });

    e2eHelpers.getEditorText('system_cancellation_message').then(function (value) {
      expect(value).toContain(emailTemplateData.systemCancellationMessage);
    });

    e2eHelpers.getElementValue('location_confirmation_subject').then(function (value) {
      expect(value).toContain(emailTemplateData.locationConfirmationSubject);
    });

    e2eHelpers.getEditorText('location_confirmation_message').then(function (value) {
      expect(value).toContain(emailTemplateData.locationConfirmationMessage);
    });

    e2eHelpers.getElementValue('location_cancellation_subject').then(function (value) {
      expect(value).toContain(emailTemplateData.locationCancellationSubject);
    });

    e2eHelpers.getEditorText('location_cancellation_message').then(function (value) {
      expect(value).toContain(emailTemplateData.locationCancellationMessage);
    });
  });

  it('Save email templates at program level', () => {
    // Enter confirmation email template subject + message
    e2eHelpers.enterElementText('program_confirmation_subject', emailTemplateData.programConfirmationSubject);
    e2eHelpers.enterEditorText('program_confirmation_message', emailTemplateData.programConfirmationMessage);

    // Enter cancellation email template subject + message
    e2eHelpers.enterElementText('program_cancellation_subject', emailTemplateData.programCancellationSubject);
    e2eHelpers.enterEditorText('program_cancellation_message', emailTemplateData.programCancellationMessage);

    // Save and check for save message
    e2eHelpers.clickButton('saveEmailTemplates');
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.getElementText('saveMessage_top').then(function (value) {
      expect(value).toContain(emailTemplateData.saveMessage);
    });
    e2eHelpers.getElementText('saveMessage_bottom').then(function (value) {
      expect(value).toContain(emailTemplateData.saveMessage);
    });

    // Confirm email subjects and messages
    e2eHelpers.getElementValue('program_confirmation_subject').then(function (value) {
      expect(value).toContain(emailTemplateData.programConfirmationSubject);
    });

    e2eHelpers.getEditorText('program_confirmation_message').then(function (value) {
      expect(value).toContain(emailTemplateData.programConfirmationMessage);
    });

    e2eHelpers.getElementValue('program_cancellation_subject').then(function (value) {
      expect(value).toContain(emailTemplateData.programCancellationSubject);
    });

    e2eHelpers.getEditorText('program_cancellation_message').then(function (value) {
      expect(value).toContain(emailTemplateData.programCancellationMessage);
    });

    e2eHelpers.clickButton('closeDialog');
    e2eHelpers.waitForDialogClose('app-email-template-dialog');
  });

  it('Clear templates at location level', () => {
    e2eHelpers.clickLink('E2E - Email Templates');
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButtonText('Configure Email Templates');
    e2eHelpers.waitForBusyOverlay();

    e2eHelpers.clickButton('location_confirmation_clear');
    e2eHelpers.clickButton('location_cancellation_clear');

    e2eHelpers.clickButtonText('Save');
    e2eHelpers.getElementText('saveMessage_top').then(function (value) {
      expect(value).toContain(emailTemplateData.saveMessage);
    });
    e2eHelpers.getElementText('saveMessage_bottom').then(function (value) {
      expect(value).toContain(emailTemplateData.saveMessage);
    });
  });

});
