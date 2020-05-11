import {E2eHelpers} from '../../e2e-helpers/e2e-helpers';
import {NavigationHelper} from '../../e2e-helpers/navigation-helper';
import {browser, protractor} from 'protractor';
import * as http from 'http';

describe('Program owner - create program', () => {
  const navigation: NavigationHelper = new NavigationHelper();
  const testData = require('../../config/testData.json');
  const programData = testData.programOwnerProgram;
  const e2eHelpers: E2eHelpers = new E2eHelpers();

  // Generate selector prefix for new program date buttons: yyyy-MM-dd_
  let newProgramDate = new Date();
  newProgramDate.setMonth(newProgramDate.getMonth() + 1); // advance one month - to match our calendar selector in the UI
  const month = newProgramDate.getMonth() + 1; // add one to month because JavaScript months are zero-based. why, javascript.
  const programDateSelector = newProgramDate.getFullYear() + '-' + month.toString().padStart(2, '0');

  // Use if needed - otherwise commented out for increased performance
  beforeAll(function () {
    http.get('http://localhost:8080/E2E/prepareProgramOwnerLocation');
  });
  //
  // beforeEach(() => {
  // });
  //
  // afterEach(() => {
  // });
  //
  afterAll(() => {
    http.get('http://localhost:8080/E2E/cleanupProgramOwnerLocation');
  });

  it('Navigate to program owner', () => {
    navigation.openProgramOwnerPage();
  });

  it('Create new program in E2E program owner test location', () => {
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickLink('E2E-PO');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButton('newProgramButton');
  });

  it('Show program validation errors', () => {
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.clickButtonText('Save').then(function () {
      e2eHelpers.getElementText('pageAlert').then(function (value) {
        expect(value).toContain(programData.validationError);
      });
      e2eHelpers.getElementText('nameRequiredError').then(function (value) {
        expect(value).toBe(programData.nameRequiredError);
      });
      e2eHelpers.getElementText('venueRequiredError').then(function (value) {
        expect(value).toBe(programData.venueRequiredError);
      });
    });
  });

  it('Enter program details', () => {
    e2eHelpers.enterElementText('name', programData.name);
    e2eHelpers.enterElementText('venue', programData.venue);
    e2eHelpers.clickButton('activeSwitch');
  });

  it('Select program dates', () => {
    e2eHelpers.clickClass('ui-datepicker-next'); // Move calendar to next month
    e2eHelpers.clickLink('14'); // Select 14th day of the month
    e2eHelpers.clickLink('15'); // Select 15th day of the month
    e2eHelpers.clickLink('16'); // Select 16th day of the month
  });

  it('Show validation messages when creating time slots', () => {
    // Open create time slots dialog
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButtonText('Bulk Create Time Slots');

    // Set start time to PM
    e2eHelpers.clickButtonText('AM');

    // Clear slot hours and minutes
    e2eHelpers.clearElementText('slotHours');
    e2eHelpers.enterElementText('slotHours', ' '); // Simulate a user entering a blank value
    e2eHelpers.clearElementText('slotMinutes');
    e2eHelpers.enterElementText('slotMinutes', ' '); // Simulate a user entering a blank value

    // Click create, check for error messages
    e2eHelpers.clickButtonText('Create Time Slots').then(function () {
      e2eHelpers.getElementText('startTimeError').then(function (value) {
        expect(value).toContain(programData.startTimeErrorMessage);
      });
      e2eHelpers.getElementText('endTimeError').then(function (value) {
        expect(value).toContain(programData.endTimeErrorMessage);
      });
      e2eHelpers.getElementText('slotHoursRequiredError').then(function (value) {
        expect(value).toContain(programData.slotHoursRequiredErrorMessage);
      });
      e2eHelpers.getElementText('slotMinutesRequiredError').then(function (value) {
        expect(value).toContain(programData.slotMinutesRequiredErrorMessage);
      });
      e2eHelpers.getElementText('maxAppointmentsRequiredError').then(function (value) {
        expect(value).toContain(programData.maxAppointmentsRequiredErrorMessage);
      });
    });

    // Close dialog
    e2eHelpers.clickButton('close');
    e2eHelpers.waitForDialogClose('app-multiple-time-slot-dialog');

    // Open create time slots dialog
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButtonText('Bulk Create Time Slots');

    // Clear start time hours
    e2eHelpers.waitForAutoFocus();
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();

    // Clear start time minutes
    browser.actions().sendKeys(protractor.Key.TAB).perform();
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();

    // Clear end time hours
    browser.actions().sendKeys(protractor.Key.TAB).perform();
    browser.actions().sendKeys(protractor.Key.TAB).perform();
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();

    // Clear end time minutes
    browser.actions().sendKeys(protractor.Key.TAB).perform();
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();

    // Set time slot hours and minutes too high
    e2eHelpers.clearElementText('slotHours');
    e2eHelpers.enterElementText('slotHours', 24);
    e2eHelpers.clearElementText('slotMinutes');
    e2eHelpers.enterElementText('slotMinutes', 60);

    // Click create, check for error messages
    e2eHelpers.clickButtonText('Create Time Slots').then(function () {
      e2eHelpers.getElementText('startTimeRequiredError').then(function (value) {
        expect(value).toContain(programData.startTimeRequiredErrorMessage);
      });
      e2eHelpers.getElementText('endTimeRequiredError').then(function (value) {
        expect(value).toContain(programData.endTimeRequiredErrorMessage);
      });
      e2eHelpers.getElementText('slotHoursInvalidError').then(function (value) {
        expect(value).toContain(programData.slotHoursInvalidErrorMessage);
      });
      e2eHelpers.getElementText('slotMinutesInvalidError').then(function (value) {
        expect(value).toContain(programData.slotMinutesInvalidErrorMessage);
      });
    });

    // Set time slot hours and minutes too high
    e2eHelpers.clearElementText('slotHours');
    e2eHelpers.enterElementText('slotHours', -1);
    e2eHelpers.clearElementText('slotMinutes');
    e2eHelpers.enterElementText('slotMinutes', -1);

    // Click create, check for error messages
    e2eHelpers.clickButtonText('Create Time Slots').then(function () {
      e2eHelpers.getElementText('slotHoursInvalidError').then(function (value) {
        expect(value).toContain(programData.slotHoursInvalidErrorMessage);
      });
      e2eHelpers.getElementText('slotMinutesInvalidError').then(function (value) {
        expect(value).toContain(programData.slotMinutesInvalidErrorMessage);
      });
    });

    // Close dialog
    e2eHelpers.clickButton('close');
    e2eHelpers.waitForDialogClose('app-multiple-time-slot-dialog');
  });

  it('Create valid time slots', () => {
    // Open create time slots dialog
    e2eHelpers.clickButton('actionsButton');
    e2eHelpers.clickButtonText('Bulk Create Time Slots');

    // Enter slot hours and minutes
    e2eHelpers.enterElementText('slotHours', 1);
    e2eHelpers.clearElementText('slotMinutes');
    e2eHelpers.enterElementText('slotMinutes', 30);

    // Enter max appointments
    e2eHelpers.enterElementText('maxAppointments', programData.maxAppointments.toString());

    // Click create, wait for dialog close
    e2eHelpers.clickButtonText('Create Time Slots');
    e2eHelpers.waitForDialogClose('app-multiple-time-slot-dialog');
  });

  it('Save program', () => {
    e2eHelpers.clickButtonText('Save').then(function () {
      e2eHelpers.getElementText('pageAlert').then(function (value) {
        expect(value).toContain(programData.saveMessage);
      });
    });
  });

  it('Confirm program dates and time slots were generated and saved correctly', () => {
    e2eHelpers.waitForBusyOverlay();

    let dateSelectors = [programDateSelector + '-14_', programDateSelector + '-15_', programDateSelector + '-16_'];

    for (let selector of dateSelectors) {
      // Expand new program date
      let dateLinkText = e2eHelpers.getElementText(selector + 'header');
      e2eHelpers.clickLink(dateLinkText);

      // wait for program date to expand
      browser.sleep(1000);

      let index = 0;
      for (let timeSlot of programData.timeSlots) {
        e2eHelpers.getElementText(selector + 'start-time-' + index).then(function (value) {
          expect(value).toBe(timeSlot.startTime);
        });
        e2eHelpers.getElementText(selector + 'end-time-' + index).then(function (value) {
          expect(value).toBe(timeSlot.endTime);
        });
        e2eHelpers.getElementText(selector + 'max-appointments-' + index).then(function (value) {
          expect(parseInt(value)).toEqual(programData.maxAppointments);
        });
        e2eHelpers.getElementText(selector + 'available-appointments-' + index).then(function (value) {
          expect(parseInt(value)).toEqual(programData.maxAppointments);
        });
        index++;
      }
    }

  });

  it('Add single time slot to single program date', () => {
    e2eHelpers.waitForBusyOverlay();

    // Add new program date
    e2eHelpers.clickLink('17'); // Select 17th day of the month
    e2eHelpers.clickButtonText('Save');
    e2eHelpers.waitForBusyOverlay();

    const selector = programDateSelector + '-17_';

    // Expand new program date
    const dateLinkText = e2eHelpers.getElementText(selector + 'header');
    e2eHelpers.clickLink(dateLinkText);

    // Open single time slot dialog
    e2eHelpers.clickButton(selector + 'single');

    // Set start time to PM
    e2eHelpers.clickButtonText('AM');

    // Click create, check for error messages
    e2eHelpers.clickButtonText('Create Time Slot').then(function () {
      e2eHelpers.getElementText('startTimeError').then(function (value) {
        expect(value).toContain(programData.startTimeErrorMessage);
      });
      e2eHelpers.getElementText('endTimeError').then(function (value) {
        expect(value).toContain(programData.endTimeErrorMessage);
      });
      e2eHelpers.getElementText('maxAppointmentsRequiredError').then(function (value) {
        expect(value).toContain(programData.maxAppointmentsRequiredErrorMessage);
      });
    });

    // Close dialog
    e2eHelpers.clickButton('close');
    e2eHelpers.waitForDialogClose('app-single-time-slot-dialog');


    // Open single time slot dialog
    e2eHelpers.clickButton(selector + 'single');

    // Clear start time hours
    e2eHelpers.waitForAutoFocus();
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();

    // Clear start time minutes
    browser.actions().sendKeys(protractor.Key.TAB).perform();
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();

    // Clear end time hours
    browser.actions().sendKeys(protractor.Key.TAB).perform();
    browser.actions().sendKeys(protractor.Key.TAB).perform();
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();

    // Clear end time minutes
    browser.actions().sendKeys(protractor.Key.TAB).perform();
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();

    // Click create, check for error messages
    e2eHelpers.clickButtonText('Create Time Slot').then(function () {
      e2eHelpers.getElementText('startTimeRequiredError').then(function (value) {
        expect(value).toContain(programData.startTimeRequiredErrorMessage);
      });
      e2eHelpers.getElementText('endTimeRequiredError').then(function (value) {
        expect(value).toContain(programData.endTimeRequiredErrorMessage);
      });
    });

    // Close dialog
    e2eHelpers.clickButton('close');
    e2eHelpers.waitForDialogClose('app-single-time-slot-dialog');

    // Open single time slot dialog
    e2eHelpers.clickButton(selector + 'single');

    // Enter single time slot from 8:00 AM - 9:30 AM
    // Start time defaults to 8:00 AM
    // Tab to end time
    e2eHelpers.waitForAutoFocus();
    browser.actions().sendKeys(protractor.Key.TAB).perform();
    browser.actions().sendKeys(protractor.Key.TAB).perform();
    browser.actions().sendKeys(protractor.Key.TAB).perform();

    // Set end time hours
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();
    browser.actions().sendKeys('9').perform();

    // Set end time minutes
    browser.actions().sendKeys(protractor.Key.TAB).perform();
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();
    browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();
    browser.actions().sendKeys('30').perform();

    // Set end time to AM
    browser.actions().sendKeys(protractor.Key.TAB).perform();
    browser.actions().sendKeys(protractor.Key.SPACE).perform();

    // Enter max appointments
    e2eHelpers.enterElementText('maxAppointments', programData.maxAppointments.toString());

    // Click create, wait for dialog close
    e2eHelpers.clickButtonText('Create Time Slot');
    e2eHelpers.waitForDialogClose('app-single-time-slot-dialog');

    // Save new time slot
    e2eHelpers.clickButtonText('Save');
    e2eHelpers.waitForBusyOverlay();

    // Expand new program date
    e2eHelpers.clickLink(dateLinkText);

    // wait for program date to expand
    browser.sleep(1000);

    e2eHelpers.getElementText(selector + 'start-time-0').then(function (value) {
      expect(value).toBe('08:00 AM');
    });
    e2eHelpers.getElementText(selector + 'end-time-0').then(function (value) {
      expect(value).toBe('09:30 AM');
    });
    e2eHelpers.getElementText(selector + 'max-appointments-0').then(function (value) {
      expect(parseInt(value)).toEqual(programData.maxAppointments);
    });
    e2eHelpers.getElementText(selector + 'available-appointments-0').then(function (value) {
      expect(parseInt(value)).toEqual(programData.maxAppointments);
    });
  });

  it('Add multiple time slots to single program date', () => {
    const selector = programDateSelector + '-17_';

    // Open single time slot dialog
    e2eHelpers.clickButton(selector + 'multiple');

    // Start time defaults to 8:00 AM
    // Start time defaults to 5:00 PM

    // Enter slot hours and minutes
    e2eHelpers.enterElementText('slotHours', 1);
    e2eHelpers.clearElementText('slotMinutes');
    e2eHelpers.enterElementText('slotMinutes', 30);

    // Enter max appointments
    e2eHelpers.enterElementText('maxAppointments', programData.maxAppointments.toString());

    // Click create, wait for dialog close
    e2eHelpers.clickButtonText('Create Time Slots');
    e2eHelpers.waitForDialogClose('app-multiple-time-slot-dialog');

    // Save new time slots
    e2eHelpers.clickButtonText('Save');
    e2eHelpers.waitForBusyOverlay();

    // Expand new program date
    let dateLinkText = e2eHelpers.getElementText(selector + 'header');
    e2eHelpers.clickLink(dateLinkText);

    // wait for program date to expand
    browser.sleep(1000);

    let index = 0;
    for (let timeSlot of programData.timeSlots) {
      e2eHelpers.getElementText(selector + 'start-time-' + index).then(function (value) {
        expect(value).toBe(timeSlot.startTime);
      });
      e2eHelpers.getElementText(selector + 'end-time-' + index).then(function (value) {
        expect(value).toBe(timeSlot.endTime);
      });
      e2eHelpers.getElementText(selector + 'max-appointments-' + index).then(function (value) {
        expect(parseInt(value)).toEqual(programData.maxAppointments);
      });
      e2eHelpers.getElementText(selector + 'available-appointments-' + index).then(function (value) {
        expect(parseInt(value)).toEqual(programData.maxAppointments);
      });
      index++;
    }
  });

  it('Increase maximum appointments for all time slots in a program date', () => {
    const selector = programDateSelector + '-17_';

    // Open change max appointments dialog
    // Default is increase maximum appointments
    e2eHelpers.clickButton(selector + 'change-max');

    // Enter max appointments
    e2eHelpers.enterElementText('maxAppointmentsChange', programData.maxAppointmentsIncrease);

    // Click create, wait for dialog close
    e2eHelpers.clickButtonText('Change max appointments');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.waitForDialogClose('app-change-max-appointments-dialog');

    let index = 0;
    for (let timeSlot of programData.timeSlots) {
      e2eHelpers.getElementText(selector + 'start-time-' + index).then(function (value) {
        expect(value).toBe(timeSlot.startTime);
      });
      e2eHelpers.getElementText(selector + 'end-time-' + index).then(function (value) {
        expect(value).toBe(timeSlot.endTime);
      });
      e2eHelpers.getElementText(selector + 'max-appointments-' + index).then(function (value) {
        expect(parseInt(value)).toEqual(programData.maxAppointments + programData.maxAppointmentsIncrease);
      });
      e2eHelpers.getElementText(selector + 'available-appointments-' + index).then(function (value) {
        expect(parseInt(value)).toEqual(programData.maxAppointments + programData.maxAppointmentsIncrease);
      });
      index++;
    }
  });

  it('Decrease maximum appointments for all time slots in a program date', () => {
    const selector = programDateSelector + '-17_';

    // Open change max appointments dialog
    e2eHelpers.clickButton(selector + 'change-max');


    // Default is increase maximum appointments, key down to change selection to decrease
    e2eHelpers.waitForAutoFocus();
    browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();

    // Enter max appointments
    e2eHelpers.enterElementText('maxAppointmentsChange', programData.maxAppointmentsDecrease);

    // Click create, wait for dialog close
    e2eHelpers.clickButtonText('Change max appointments');
    e2eHelpers.waitForBusyOverlay();
    e2eHelpers.waitForDialogClose('app-change-max-appointments-dialog');

    let index = 0;
    for (let timeSlot of programData.timeSlots) {
      e2eHelpers.getElementText(selector + 'start-time-' + index).then(function (value) {
        expect(value).toBe(timeSlot.startTime);
      });
      e2eHelpers.getElementText(selector + 'end-time-' + index).then(function (value) {
        expect(value).toBe(timeSlot.endTime);
      });
      e2eHelpers.getElementText(selector + 'max-appointments-' + index).then(function (value) {
        expect(parseInt(value)).toEqual(programData.maxAppointments + programData.maxAppointmentsIncrease - programData.maxAppointmentsDecrease);
      });
      e2eHelpers.getElementText(selector + 'available-appointments-' + index).then(function (value) {
        expect(parseInt(value)).toEqual(programData.maxAppointments + programData.maxAppointmentsIncrease - programData.maxAppointmentsDecrease);
      });
      index++;
    }
  });

});
