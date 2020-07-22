import {E2eHelpers} from '../../e2e-helpers/e2e-helpers';
import {NavigationHelper} from '../../e2e-helpers/navigation-helper';
import {browser, by} from 'protractor';

describe('System announcement', () => {
  const navigation: NavigationHelper = new NavigationHelper();
  const testData = require('../../config/testData.json');
  const systemAnnouncementData = testData.systemAnnouncement;
  const e2eHelpers: E2eHelpers = new E2eHelpers();

  // Use if needed - otherwise commented out for increased performance
  // beforeAll(function () {
  // });
  //
  // beforeEach(() => {
  // });
  //
  // afterEach(() => {
  // });
  //
  // afterAll(() => {
  // });

  it('Navigate to admin page', () => {
    navigation.openAdminPage();
  });

  it('Open system announcement dialog', () => {
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButton('systemAnnouncementButton');
    e2eHelpers.getElementText('dialogTitle').then(function(value) {
      expect(value).toContain(systemAnnouncementData.dialogTitle);
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
      expect(value).toContain(systemAnnouncementData.saveMessage);
    });
    e2eHelpers.isElementSelected('active').then(function (value) {
      expect(value).toBe(false);
    });
  });

  it('Save system announcement', () => {
    e2eHelpers.enterElementText('message', systemAnnouncementData.message);
    e2eHelpers.clickButton('activeSwitch');
    e2eHelpers.clickButton('saveButton');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('alertMessage').then(function (value) {
      expect(value).toContain(systemAnnouncementData.saveMessage);
    });
    e2eHelpers.isElementSelected('active').then(function (value) {
      expect(value).toBe(true);
    });
    e2eHelpers.clickButton('closeAnnouncementDialog');
    e2eHelpers.waitForDialogClose('app-announcement-dialog')
  });

  it('Check sign-up page for announcement', () => {
    e2eHelpers.clickLink('Sign Up');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('systemAnnouncement').then(function (value) {
      expect(value).toContain(systemAnnouncementData.message);
    });
  });

  it('Inactivate announcement', () => {
    e2eHelpers.clickLink('Admin');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButton('systemAnnouncementButton');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('activeSwitch');
    e2eHelpers.clickButton('saveButton');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('alertMessage').then(function (value) {
      expect(value).toContain(systemAnnouncementData.saveMessage);
    });
    e2eHelpers.clickButton('closeAnnouncementDialog');
  });

  it('Check that sign-up page does not show inactive announcement', () => {
    e2eHelpers.clickLink('Sign Up');
    e2eHelpers.waitForBusyOverlay().then(function (value) {
      expect(browser.isElementPresent(by.id('systemAnnouncement'))).toBeFalsy();
    });
  });

  it('Clear E2E announcement and automatically set as inactive', () => {
    e2eHelpers.clickLink('Admin');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButton('systemAnnouncementButton');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clearElementText('message');
    e2eHelpers.enterElementText('message', ' '); // Simulate a user deleting a message
    e2eHelpers.clickButton('saveButton');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('alertMessage').then(function (value) {
      expect(value).toContain(systemAnnouncementData.saveMessage);
    });
    e2eHelpers.isElementSelected('active').then(function (value) {
      expect(value).toBe(false);
    });
  });
});
