import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorpPsSearchRoutingModule } from './corp-ps-search-routing.module';
import { CorpPsSearchComponent } from './corp-ps-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';
import { ErfeMaterialModule } from 'src/app/erfe-material.module';
import { CardModule } from 'primeng/card';
import { AccordionModule, ButtonModule, RadioButtonModule, FieldsetModule, PaginatorModule, DialogModule, InputTextModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/dropdown';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { NgBusyModule } from "ng-busy";
import { TableModule } from "primeng/table";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { Animations } from "../../shared/animation/animations";
import { CorppsrfeService } from "../../service/component/corppsrfe-service";
import { NewRFEDocumentModule } from "../new-rfe-document/new-rfe-document.module"
@NgModule({
  declarations: [CorpPsSearchComponent],
  imports: [
    TooltipModule,
    CommonModule,
    CorpPsSearchRoutingModule,
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
    DialogModule,
    MessageModule,
    NewRFEDocumentModule,
    AlertModule.forRoot()
  ],
  providers: [
    Animations,
    CorppsrfeService,
  ]
})
export class CorpPsSearchModule { }
