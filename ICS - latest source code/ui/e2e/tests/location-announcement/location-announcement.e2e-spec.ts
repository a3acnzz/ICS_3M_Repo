import {E2eHelpers} from '../../e2e-helpers/e2e-helpers';
import {NavigationHelper} from '../../e2e-helpers/navigation-helper';
import {browser, by} from 'protractor';
import * as http from 'http';

describe('Location announcement', () => {
  const navigation: NavigationHelper = new NavigationHelper();
  const testData = require('../../config/testData.json');
  const locationAnnouncementData = testData.locationAnnouncement;
  const e2eHelpers: E2eHelpers = new E2eHelpers();

  // Use if needed - otherwise commented out for increased performance
  beforeAll(function () {
    http.get('http://localhost:8080/E2E/prepareLocationAnnouncement');
  });
  //
  // beforeEach(() => {
  // });
  //
  // afterEach(() => {
  // });
  //
  afterAll(() => {
    http.get('http://localhost:8080/E2E/cleanupLocationAnnouncement');
  });

  it('Navigate to program owner location page', () => {
    navigation.openProgramOwnerPage();
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink('E2E-LOC-ANNOUNCE');
  });

  it('Open location announcement dialog', () => {
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButtonText('Configure Location Announcement');
    e2eHelpers.getElementText('dialogTitle').then(function(value) {
      expect(value).toContain(locationAnnouncementData.dialogTitle);
    });
  });

  it('Clear existing announcement and automatically set as inactive', () => {
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clearElementText('message');
    e2eHelpers.enterElementText('message', ' '); // Simulate a user deleting a message
    e2eHelpers.waitForAutoFocus();
    e2eHelpers.clickButton('saveButton');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('alertMessage').then(function (value) {
      expect(value).toContain(locationAnnouncementData.saveMessage);
    });
    e2eHelpers.isElementSelected('active').then(function (value) {
      expect(value).toBe(false);
    });
  });

  it('Save announcement', () => {
    e2eHelpers.enterElementText('message', locationAnnouncementData.message);
    e2eHelpers.clickButton('activeSwitch');
    e2eHelpers.clickButton('saveButton');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('alertMessage').then(function (value) {
      expect(value).toContain(locationAnnouncementData.saveMessage);
    });
    e2eHelpers.isElementSelected('active').then(function (value) {
      expect(value).toBe(true);
    });
    e2eHelpers.clickButton('closeAnnouncementDialog');
    e2eHelpers.waitForDialogClose('app-announcement-dialog')
  });

  it('Check location sign-up page for announcement', () => {
    e2eHelpers.clickLink('Sign Up');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink('E2E - Location - Announcement');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('locationAnnouncement').then(function (value) {
      expect(value).toContain(locationAnnouncementData.message);
    });
  });

  it('Inactivate announcement', () => {
    e2eHelpers.clickLink('Program Owner');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink('E2E-LOC-ANNOUNCE');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButtonText('Configure Location Announcement');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('activeSwitch');
    e2eHelpers.clickButton('saveButton');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('alertMessage').then(function (value) {
      expect(value).toContain(locationAnnouncementData.saveMessage);
    });
    e2eHelpers.clickButton('closeAnnouncementDialog');
  });

  it('Check that sign-up page does not show inactive announcement', () => {
    e2eHelpers.clickLink('Sign Up');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink('E2E - Location - Announcement');
    e2eHelpers.waitForBusyOverlay().then(function (value) {
      expect(browser.isElementPresent(by.id('locationAnnouncement'))).toBeFalsy();
    });
  });

  it('Clear E2E announcement and automatically set as inactive', () => {
    e2eHelpers.clickLink('Program Owner');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink('E2E-LOC-ANNOUNCE');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButtonText('Configure Location Announcement');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clearElementText('message');
    e2eHelpers.enterElementText('message', ' '); // Simulate a user deleting a message
    e2eHelpers.clickButton('saveButton');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('alertMessage').then(function (value) {
      expect(value).toContain(locationAnnouncementData.saveMessage);
    });
    e2eHelpers.isElementSelected('active').then(function (value) {
      expect(value).toBe(false);
    });
  });
});
