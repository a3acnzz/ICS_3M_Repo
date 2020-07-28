import {E2eHelpers} from '../../e2e-helpers/e2e-helpers';
import {NavigationHelper} from '../../e2e-helpers/navigation-helper';
import {browser, by} from 'protractor';
import * as http from 'http';

describe('Location contact us', () => {
  const navigation: NavigationHelper = new NavigationHelper();
  const testData = require('../../config/testData.json');
  const contactUsData = testData.contactUs;
  const e2eHelpers: E2eHelpers = new E2eHelpers();

  // Use if needed - otherwise commented out for increased performance
  beforeAll(function () {
    http.get('http://localhost:8080/E2E/prepareLocationContactUs');
  });
  //
  // beforeEach(() => {
  // });
  //
  // afterEach(() => {
  // });
  //
  afterAll(() => {
    http.get('http://localhost:8080/E2E/cleanupLocationContactUs');
  });

  it('Navigate to program owner location page', () => {
    navigation.openProgramOwnerPage();
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink('E2E-LOC-CONTACT');
  });

  it('Open contact us dialog', () => {
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButtonText('Actions');
    e2eHelpers.clickButtonText('Configure Contact Us');
    e2eHelpers.getElementText('dialogTitle').then(function(value) {
      expect(value).toContain(contactUsData.locationName);
    });
  });

  it('Clear existing announcement and automatically set as inactive', () => {
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clearElementText('message');
    e2eHelpers.enterElementText('message', contactUsData.contactMessage);
    e2eHelpers.clickButtonText('Save');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('saveMessage').then(function (value) {
      expect(value).toContain(contactUsData.saveMessage);
    });
    e2eHelpers.clickButton('closeDialog');
    e2eHelpers.waitForDialogClose('app-contact-us-configure-dialog');
  });

  it('Check location sign-up page for contact us details', () => {
    e2eHelpers.clickLink('Sign Up');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink(contactUsData.locationName);
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButtonText('Contact Us');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('message').then(function (value) {
      expect(value).toContain(contactUsData.contactMessage);
    });
    e2eHelpers.clickButton('closeDialog');
    e2eHelpers.waitForDialogClose('app-contact-us-view-dialog');
  });

  it('Clear contact us details', () => {
    e2eHelpers.clickLink('Program Owner');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink('E2E-LOC-CONTACT');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButtonText('Actions');
    e2eHelpers.clickButtonText('Configure Contact Us');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clearElementText('message');
    e2eHelpers.enterElementText('message', ' '); // Simulate deleting contact us message
    e2eHelpers.clickButtonText('Save');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('saveMessage').then(function (value) {
      expect(value).toContain(contactUsData.saveMessage);
    });
    e2eHelpers.clickButton('closeDialog');
    e2eHelpers.waitForDialogClose('app-contact-us-configure-dialog');
  });

  it('Check location sign-up page for contact us \'Not Configured\' message ', () => {
    e2eHelpers.clickLink('Sign Up');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink(contactUsData.locationName);
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButtonText('Contact Us');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('message').then(function (value) {
      expect(value).toContain(contactUsData.notConfiguredMessage);
    });
    e2eHelpers.clickButton('closeDialog');
    e2eHelpers.waitForDialogClose('app-contact-us-view-dialog');
  });
});
