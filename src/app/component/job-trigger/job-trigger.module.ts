import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobTriggerComponent } from './job-trigger.component';
import { JobTriggerRouting } from './job-trigger.routing';
import { CardModule } from 'primeng/card';
import { NgBusyModule } from "ng-busy";
import { DialogModule } from 'primeng/primeng';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  declarations: [JobTriggerComponent],
  imports: [
    CommonModule,
    JobTriggerRouting,
    CardModule,
    NgBusyModule,
    DialogModule,
    CountdownModule
  ],
})
export class JobTriggerModule { }
