import {by, element} from 'protractor';

export class AdminLocationPage {

  getTableRow(rowNum) {
    const row = element.all(by.tagName('tbody')).get(rowNum);
    const cells = row.all(by.tagName('td'));
    return cells.map(function (elm) {
      return elm.getText();
    });
  }
}
