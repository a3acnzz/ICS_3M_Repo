import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss']
})
export class ErrorPopupComponent implements OnInit {
  /**Calling the Input()
   * 
   */
  @Input() savedAsDraftRequiredPopup;
  /**
   * Specific error message
   */
  @Input() specificErrorMessagesContainer: any[];
  /**Calling the Output()
   * 
   */
  @Output() eventClick = new EventEmitter();
  /** Constructor for ErrorPopupComponent
   * 
   */
  constructor() { }
/**Calling the ngOnInit() 
  * 
  */
  ngOnInit() {
  }
/**cancel the onClick() 
  * 
  */
  onClick() {
    this.specificErrorMessagesContainer = [];
    this.eventClick.emit();
  }
}
