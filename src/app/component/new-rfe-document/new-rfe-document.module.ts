import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { NewRFEDocumentComponent } from './new-rfe-document.component';
import { NewRFEDocumentRouting } from './new-rfe-document.routing';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownModule, InputTextModule, ButtonModule, DialogModule, MessageService } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { ErrorPopupComponent } from './error-popup/error-popup.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { EIDpopupComponent } from './eidpopup/eidpopup.component';
import { Animations } from "../../shared/animation/animations";
import { CorppsrfeService } from 'src/app/service/component/corppsrfe-service';
import { NgBusyModule } from "ng-busy";
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  imports: [
    NewRFEDocumentRouting,
    PanelModule,
    ButtonModule,
    CardModule,
    ToastModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    RadioButtonModule,
    MessagesModule,
    MessageModule,
    CommonModule,
    DialogModule,
    InputTextareaModule,
    FileUploadModule,
    CalendarModule,
    TableModule,
    NgBusyModule,
    FormsModule,
    AutoCompleteModule
    // AlertModule.forRoot()
  ],
  declarations: [
    NewRFEDocumentComponent,
    ErrorPopupComponent,
    EIDpopupComponent
  ],
  exports: [
    EIDpopupComponent,
  ],
  providers: [
    // DialogService,
    Animations,
    MessageService,
    CorppsrfeService,
  ]
})
export class NewRFEDocumentModule {
}
