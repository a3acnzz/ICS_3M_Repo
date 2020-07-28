import {NavigationHelper} from '../../e2e-helpers/navigation-helper';
import {E2eHelpers} from '../../e2e-helpers/e2e-helpers';
import {AdminManagePage} from './admin-manage-admin.po';
import {browser} from 'protractor';
import * as http from 'http';

describe('Admin Manage Page', () => {
  const navigation: NavigationHelper = new NavigationHelper();
  const adminManagePage: AdminManagePage = new AdminManagePage();
  const testData = require('../../config/testData.json');
  const adminManageData = testData.manageAdmin;
  const e2eHelpers: E2eHelpers = new E2eHelpers();

  // Use if needed - otherwise commented out for increased performance
  beforeAll(function () {
    http.get('http://localhost:8080/E2E/prepareAdminManageAdmin');
  });
  //
  // beforeEach(() => {
  // });
  //
  // afterEach(() => {
  // });
  //
  afterAll(() => {
    http.get('http://localhost:8080/E2E/cleanUpAdminManageAdmin');
  });

  it('Navigate to admin page', () => {
    navigation.openAdminPage();
  });

  it('Navigate to mange admin page', () => {
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButton('manageAdminButton');
  });

  it('Add a new admin user', () => {
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButton('addAdminUserButton');
    e2eHelpers.waitForAutoFocus();
    e2eHelpers.enterElementText('userPin', adminManageData.adminUserUserPin);
    e2eHelpers.clickButton('userSearchButton');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButtonText('Select');
    e2eHelpers.waitForDialogClose('app-user-search-dialog');
    e2eHelpers.clickButton('saveButton');
    e2eHelpers.getElementText('alertMessage').then(function (value) {
      expect(value).toContain(adminManageData.saveMessage);
    });
  });

  it('Confirm user was added successfully', () => {
    // Reload page to get lastest data
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink('Admin');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButton('manageAdminButton');

    e2eHelpers.waitForBusyOverlay();
    adminManagePage.getTable().then(function (value) {
      expect(value).toContain(adminManageData.adminUserUserPin);
      expect(value).toContain(adminManageData.adminUserFirstName);
      expect(value).toContain(adminManageData.adminUserLastName);
    });
  });

  it('Remove existing admin user', () => {
    e2eHelpers.clickButton('removeAdminUser_' + adminManageData.adminUserUserPin);
    e2eHelpers.clickButton('saveButton');
    e2eHelpers.getElementText('alertMessage').then(function (value) {
      expect(value).toContain(adminManageData.saveMessage);
    });
  });

  it('Confirm user was removed successfully', () => {
    // Reload page to get lastest data
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink('Admin');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButton('manageAdminButton');

    e2eHelpers.waitForBusyOverlay();
    adminManagePage.getTable().then(function (value) {
      expect(value).not.toContain(adminManageData.adminUserUserPin);
    });
  });
});
