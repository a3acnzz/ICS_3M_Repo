import {browser, by, element, protractor} from 'protractor';
import {} from 'jasmine';

const EC = protractor.ExpectedConditions;

export class E2eHelpers {

  waitForAutoFocus() {
    browser.sleep(500);
  }

  waitForBusyOverlay() {
    return browser.wait(EC.not(EC.presenceOf(this.getBusyOverlay())));
  }

  getBusyOverlay() {
    return element(by.tagName('default-busy'));
  }

  waitForDialogClose(dialogTag) {
    return browser.wait(EC.not(EC.presenceOf(this.getDialog(dialogTag))));
  }

  getDialog(dialogTag) {
    return element(by.tagName(dialogTag));
  }

  clickButton(id) {
    const buttonElement = element(by.id(id));
    browser.wait(EC.elementToBeClickable(buttonElement), 5000);
    return buttonElement.click();
  }

  clickClass(className) {
    return element(by.className(className)).click();
  }

  clickLink(value) {
    return element(by.linkText(value)).click();
  }

  clickButtonText(value) {
    return element(by.buttonText(value)).click();
  }

  clickPartialButtonText(value) {
    return element(by.partialButtonText(value)).click();
  }

  getElementText(id) {
    return element(by.id(id)).getText();
  }

  clearElementText(id) {
    return element(by.id(id)).clear();
  }

  enterElementText(id, value) {
    return element(by.id(id)).sendKeys(value);
  }

  getElementValue(id) {
    return element(by.id(id)).getAttribute('value');
  }

  isElementSelected(id) {
    return element(by.id(id)).isSelected();
  }

  /*
    There methods use the current CSS selector for the text editor. This may change in a future update.

    To copy a CSS selector in Chrome:
    1. Right click the page element and choose 'Inspect'
    2. Right click the HTML element in the inspector and choose 'Copy' > 'Copy Selector'
  */
  enterEditorText(id, value) {
    return element(by.css('#'+ id +'> div > div.ui-editor-content.ql-container.ql-snow > div.ql-editor')).sendKeys(value);
  }

  clearEditorText(id) {
    return element(by.css('#'+ id +'> div > div.ui-editor-content.ql-container.ql-snow > div.ql-editor')).clear();
  }

  getEditorText(id) {
    return element(by.css('#'+ id +'> div > div.ui-editor-content.ql-container.ql-snow > div.ql-editor')).getText();
  }
}
