import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CorppsrfeService } from 'src/app/service/component/corppsrfe-service';
import { CountdownConfig } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-trigger',
  templateUrl: './job-trigger.component.html',
  styleUrls: ['./job-trigger.component.scss']
})
export class JobTriggerComponent implements OnInit {
  errorMsg: string = '';
  amapsLoadCountDownMsg: string = '';
  rfaUpdateCountDownMsg: string = '';
  confirmAmapsLoadDialog: boolean = false;
  confirmRfaUpdateDialog: boolean = false;
  amapsLoadUpcomingRunDate: string = '';
  rfaUpdateUpcomingRunDate: string = '';
  amapsLoadCountDownConfig: CountdownConfig = {};
  rfaUpdateCountDownConfig: CountdownConfig = {};
  amapsLoadButtonDisable: boolean = true;
  rfaUpdateButtonDisable: boolean = true;

  amapsLoadJobHistory: any;
  rfaUpdateJobHistory: any;

  busyLoading: Subscription;

  constructor(private _location: Location, private jobTrigger: CorppsrfeService, private toastr: ToastrService, ) { }

  ngOnInit() {
    this.busyLoading = this.jobTrigger.jobHistory('amaps_load_job').subscribe({
      next: (result: any) => {
        this.amapsLoadJobHistory = result;
        this.amapsLoadJobHistory.forEach(element => {
          if (element) {
            if (isNaN(element)) {
              this.amapsLoadUpcomingRunDate = element;
            } else {
              let minuteValue = 0;
              let secondsValue = 0;
              if (element > 0) {
                minuteValue = element / 60;
                secondsValue = element % 60;
              }
              if (element <= 720 || element <= 600 || element <= 0) {
                if (element <= 720) {
                  this.amapsLoadCountDownConfig = { leftTime: element, notify: [600] };
                  this.amapsLoadCountDownMsg = `\u2022 AMAPS Load Job manual trigger will be disabled in approximately ${minuteValue.toFixed(0)} minutes ${secondsValue.toFixed(2)} seconds. Please check the countdown.`;
                  this.amapsLoadButtonDisable = false;
                }
                if (element <= 600) {
                  this.amapsLoadCountDownConfig = { leftTime: element }
                  this.amapsLoadCountDownMsg = `\u2022 AMAPS Load Job manual trigger is disabled due to a scheduled trigger for the same in approximately ${minuteValue.toFixed(0)} minutes. Please check the countdown.`;
                  this.amapsLoadButtonDisable = true;
                }
                if (element <= 0) {
                  this.amapsLoadCountDownConfig = { leftTime: 0 }
                  this.amapsLoadCountDownMsg = '\u2022 AMAPS Load Job manual trigger is disabled since it has been triggered just few minutes ago. Please refresh and try again after 5 minutes.';
                  this.amapsLoadButtonDisable = true;
                }
              } else {
                this.amapsLoadCountDownConfig = { leftTime: element, notify: [720, 600] };
                this.amapsLoadButtonDisable = false;
                this.amapsLoadCountDownMsg = '';
              }
            }
          } else {
            this.amapsLoadCountDownMsg = '\u2022 AMAPS Load Job manual trigger is disabled due to some technical issues. Please refresh and try again after some time.';
            this.amapsLoadButtonDisable = true;
          }
        });
      },
      error: error =>
        this.errorMsg = error
    });

    this.busyLoading = this.jobTrigger.jobHistory('RFA_update_job').subscribe({
      next: (result: any) => {
        this.amapsLoadJobHistory = result;
        this.amapsLoadJobHistory.forEach(element => {
          if (element) {
            if (isNaN(element)) {
              this.rfaUpdateUpcomingRunDate = element;
            } else {
              let minuteValue = 0;
              let secondsValue = 0;
              if (element > 0) {
                minuteValue = element / 60;
                secondsValue = element % 60;
              }
              if (element <= 720 || element <= 600 || element <= 0) {
                if (element <= 720) {
                  this.rfaUpdateCountDownConfig = { leftTime: element, notify: [600] };
                  this.rfaUpdateCountDownMsg = `\u2022 RFA Update Job manual trigger will be disabled in approximately ${minuteValue.toFixed(0)} minutes ${secondsValue.toFixed(2)} seconds. Please check the countdown.`;
                  this.rfaUpdateButtonDisable = false;
                }
                if (element <= 600) {
                  this.rfaUpdateCountDownConfig = { leftTime: element }
                  this.rfaUpdateCountDownMsg = `\u2022 RFA Update Job manual trigger is disabled due to a scheduled trigger for the same in approximately ${minuteValue.toFixed(0)} minutes. Please check the countdown.`;
                  this.rfaUpdateButtonDisable = true;
                }
                if (element <= 0) {
                  this.rfaUpdateCountDownConfig = { leftTime: 0 }
                  this.rfaUpdateCountDownMsg = '\u2022 RFA Update Job manual trigger is disabled since it has been triggered just few minutes ago. Please refresh and try again after 5 minutes.';
                  this.rfaUpdateButtonDisable = true;
                }
              } else {
                this.rfaUpdateCountDownConfig = { leftTime: element, notify: [720, 600] };
                this.rfaUpdateButtonDisable = false;
                this.rfaUpdateCountDownMsg = '';
              }
            }
          } else {
            this.rfaUpdateCountDownMsg = '\u2022 RFA Update Job manual trigger is disabled due to some technical issues. Please refresh and try again after some time.';
            this.rfaUpdateButtonDisable = true;
          }
        });
      },
      error: error =>
        this.errorMsg = error
    });

  }
  amapsLoadClicked() {
    this.confirmAmapsLoadDialog = true;
  }
  amapsLoadPopUpClicked() {
    // Trigger job 1
    this.confirmAmapsLoadDialog = false;
    this.busyLoading = this.jobTrigger.jobTrigger('amaps_load_job').subscribe({
      next: (result: any) => {
        if (result) {
          if (result) {
            this.toastr.success("AMAPS Load Job manual trigger was successful", "Triggered");
            this.errorMsg = '';
          }
        }
      },
      error: error => {
        this.toastr.error("AMAPS Load Job manual trigger was failed. Possible Reason: It may have been triggered a minute ago by yourself or other admins(Approximate Cooldown Time: 2 minutes).", "Trigger Failed");
        this.errorMsg = error;
      }
    });
  }
  amapsLoadPopUpHide() {
    this.confirmAmapsLoadDialog = false;
  }
  rfaUpdateJobClicked() {
    this.confirmRfaUpdateDialog = true;
  }
  rfaUpdateJobPopUpClicked() {
    // Trigger job 2
    this.confirmRfaUpdateDialog = false;
    this.busyLoading = this.jobTrigger.jobTrigger('RFA_update_job').subscribe({
      next: (result: any) => {
        if (result) {
          this.toastr.success("RFA Update Job manual trigger was successful", "Triggered");
          this.errorMsg = '';
        }
      },
      error: error => {
        this.toastr.error("AMAPS Load Job manual trigger was failed. Possible Reason: It may have been triggered a minute ago by yourself or other admins(Approximate Cooldown Time: 2 minutes).", "Trigger Failed");
        this.errorMsg = error;
      }
    });
  }
  rfaUpdateJobPopUpHide() {
    this.confirmRfaUpdateDialog = false;
  }

  amapsLoadCountDownEvent($event) {
    if (!this.amapsLoadButtonDisable) {
      if ($event.left === 720000 && $event.text === '00:12:00') {
        this.amapsLoadCountDownMsg = '\u2022 AMAPS Load Job manual trigger will be disabled in exactly 2 minutes. Please check the countdown.';
      }
      if ($event.left === 600000 && $event.text === '00:10:00') {
        this.amapsLoadCountDownMsg = '\u2022 AMAPS Load Job manual trigger is disabled due to a scheduled trigger for the same in exactly 10 minutes. Please check the countdown.';
        this.amapsLoadButtonDisable = true;
      } else {
        this.amapsLoadButtonDisable = false;
      }
      if ($event.left !== 720000 && $event.left !== 600000) {
        this.amapsLoadCountDownMsg = '';
      }
    }
  }
  rfaUpdateCountDownEvent($event) {
    if (!this.rfaUpdateButtonDisable) {
      if ($event.left === 720000 && $event.text === '00:12:00') {
        this.rfaUpdateCountDownMsg = '\u2022 RFA Update Job manual trigger will be disabled in exactly 2 minutes. Please check the countdown.';
      }
      if ($event.left === 600000 && $event.text === '00:10:00') {
        this.rfaUpdateCountDownMsg = '\u2022 RFA Update Job manual trigger is disabled due to a scheduled trigger for the same in exactly 10 minutes. Please check the countdown.';
        this.rfaUpdateButtonDisable = true;
      } else {
        this.rfaUpdateButtonDisable = false;
      }
      if ($event.left !== 720000 && $event.left !== 600000) {
        this.rfaUpdateCountDownMsg = '';
      }
    }
  }

  goBack() {
    this._location.back();
  }

}
