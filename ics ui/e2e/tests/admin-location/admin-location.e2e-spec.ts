import {NavigationHelper} from '../../e2e-helpers/navigation-helper';
import {AdminLocationPage} from './admin-location.po';
import {E2eHelpers} from '../../e2e-helpers/e2e-helpers';
import * as http from 'http';

describe('Admin Location Page', () => {
  const navigation: NavigationHelper = new NavigationHelper();
  const adminLocationPage: AdminLocationPage = new AdminLocationPage();
  const testData = require('../../config/testData.json');
  const adminLocationData = testData.location;
  const e2eHelpers: E2eHelpers = new E2eHelpers();

  // Use if needed - otherwise commented out for increased performance
  beforeAll(function () {
    http.get('http://localhost:8080/E2E/cleanupAdminLocation');
  });
  //
  // beforeEach(() => {
  // });
  //
  // afterEach(() => {
  // });
  //
  afterAll(() => {
    http.get('http://localhost:8080/E2E/cleanupAdminLocation');
  });

  it('Navigate to admin page', () => {
    navigation.openAdminPage();
  });

  it('Navigate to new location page', () => {
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButton('newLocationButton');
  });

  it('Show validation errors', () => {
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('saveButton').then(function () {
      e2eHelpers.getElementText('nameRequiredError').then(function (value) {
        expect(value).toBe(adminLocationData.nameRequiredError);
      });
      e2eHelpers.getElementText('codeRequiredError').then(function (value) {
        expect(value).toBe(adminLocationData.codeRequiredError);
      });
      e2eHelpers.getElementText('timeZoneRequiredError').then(function (value) {
        expect(value).toBe(adminLocationData.timeZoneRequiredError);
      });
    });
  });

  it('Enter valid data and save', () => {
    e2eHelpers.enterElementText('name', adminLocationData.name);
    e2eHelpers.enterElementText('code', adminLocationData.code);
    e2eHelpers.enterElementText('timeZone', adminLocationData.timeZone);
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButton('addProgramOwnerButton');
    e2eHelpers.waitForAutoFocus();
    e2eHelpers.enterElementText('userPin', adminLocationData.programOwnerUserPin);
    e2eHelpers.clickButton('userSearchButton');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButtonText('Select');
    e2eHelpers.waitForDialogClose('app-user-search-dialog');
    e2eHelpers.clickButton('saveButton');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('alertMessage').then(function (value) {
      expect(value).toContain(adminLocationData.saveMessage);
    });
  });

  it('Navigate back to admin page and reload new location', () => {
    e2eHelpers.clickLink('Admin');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink(adminLocationData.name);
  });

  it('Confirm data was saved correctly', () => {
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementValue('name').then(function (value) {
      expect(value).toBe(adminLocationData.name);
    });
    e2eHelpers.getElementValue('code').then(function (value) {
      expect(value).toBe(adminLocationData.code);
    });
    e2eHelpers.getElementValue('timeZone').then(function (value) {
      expect(value).toBe(adminLocationData.timeZone);
    });
    adminLocationPage.getTableRow(0).then(function (value) {
      expect(value).toContain(adminLocationData.programOwnerUserPin);
      expect(value).toContain(adminLocationData.programOwnerFirstName);
      expect(value).toContain(adminLocationData.programOwnerLastName);
    });
  });
});
