import {by, element} from 'protractor';

export class AdminManagePage {

  getTable() {
    const table = element.all(by.tagName('table'));
    const cells = table.all(by.tagName('td'));
    return cells.map(function (elm) {
      return elm.getText();
    });
  }
}
