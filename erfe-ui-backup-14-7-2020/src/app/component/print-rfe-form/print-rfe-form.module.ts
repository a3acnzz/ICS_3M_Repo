import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintRfeFormRoutingModule } from './print-rfe-form.routing.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, RadioButtonModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { PrintRfeFormComponent } from './print-rfe-form.component';
import { NgxPrintModule } from 'ngx-print';
import { CorppsrfeService } from 'src/app/service/component/corppsrfe-service';
import { NgBusyModule } from "ng-busy";

@NgModule({
  declarations: [PrintRfeFormComponent],
  imports: [
    CommonModule,
    PrintRfeFormRoutingModule,
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    CalendarModule,
    RadioButtonModule,
    TableModule,
    NgxPrintModule,
    NgBusyModule
  ],
  providers:[CorppsrfeService]
})
export class PrintRfeFormModule { }
