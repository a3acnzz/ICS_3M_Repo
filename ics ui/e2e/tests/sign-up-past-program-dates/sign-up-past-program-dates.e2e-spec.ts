import {E2eHelpers} from '../../e2e-helpers/e2e-helpers';
import {NavigationHelper} from '../../e2e-helpers/navigation-helper';
import * as http from 'http';

describe('Sign Up - Past Program Dates', () => {
  const navigation: NavigationHelper = new NavigationHelper();
  const testData = require('../../config/testData.json');
  const signUpData = testData.signUp;
  const e2eHelpers: E2eHelpers = new E2eHelpers();

  // Use if needed - otherwise commented out for increased performance
  beforeAll(function () {
    http.get('http://localhost:8080/E2E/prepareSignUpPastProgramDates');
  });
  //
  // beforeEach(() => {
  // });
  //
  // afterEach(() => {
  // });
  //
  afterAll(() => {
    http.get('http://localhost:8080/E2E/cleanupSignUpPastProgramDates');
  });

  it('Navigate to sign-up page', () => {
    navigation.openSignUpPage();
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink('E2E - Sign Up - Past Program Dates')
  });

  it('Test Past Program Dates message', () => {
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('selectProgram-appointment-0');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickPartialButtonText('E2E - Program - Past Program Dates'); // button text also contains venue, so using partial match
    e2eHelpers.waitForDialogClose('app-program-select-dialog');
    e2eHelpers.clickButton('selectDateTime-appointment-0');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('noAvailableDatesAlert').then(function(value) {
      expect(value).toContain(signUpData.noAvailableDatesAlertMessage);
    });
  });
});
