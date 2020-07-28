import {E2eHelpers} from '../../e2e-helpers/e2e-helpers';
import {NavigationHelper} from '../../e2e-helpers/navigation-helper';
import * as http from 'http';

describe('Sign Up - No Program', () => {
  const navigation: NavigationHelper = new NavigationHelper();
  const testData = require('../../config/testData.json');
  const signUpData = testData.signUp;
  const e2eHelpers: E2eHelpers = new E2eHelpers();

  // Use if needed - otherwise commented out for increased performance
  beforeAll(function () {
    http.get('http://localhost:8080/E2E/prepareSignUpNoProgram');
  });
  //
  // beforeEach(() => {
  // });
  //
  // afterEach(() => {
  // });
  //
  afterAll(() => {
    http.get('http://localhost:8080/E2E/cleanupSignUpNoProgram');
  });

  it('Navigate to sign-up page', () => {
    navigation.openSignUpPage();
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink('E2E - Sign Up - No Program')
  });

  it('Test No Programs message', () => {
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('selectProgram-appointment-0');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.getElementText('noProgramsAlert').then(function(value) {
      expect(value).toContain(signUpData.noProgramsAlertMessage);
    });
  });
});
