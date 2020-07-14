import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';
import { ErfeMaterialModule } from 'src/app/erfe-material.module';
import { CardModule } from 'primeng/card';
import { AccordionModule, ButtonModule, RadioButtonModule, FieldsetModule, PaginatorModule, InputTextModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/dropdown';
import { NgBusyModule } from "ng-busy";
import { TableModule } from "primeng/table";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { NewRfeDocumentService } from 'src/app/service/component/new-rfe-document.service';
import { NewRFEDocumentModule } from '../new-rfe-document.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaginatorModule,
    AccordionModule,
    FieldsetModule,
    InputTextareaModule,
    FormsModule,
    ErfeMaterialModule,
    CardModule,
    DropdownModule,
    InputTextModule,
    RadioButtonModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    MessagesModule,
    NgBusyModule,
    MessageModule,
    AlertModule.forRoot(),
    NewRFEDocumentModule
  ],
  providers: [

    NewRfeDocumentService,
  ]
})
export class EIDPopupModule { }
