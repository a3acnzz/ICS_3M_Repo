import { HeaderComponent } from './component/header/header.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { InformationalCopyComponent } from './component/dialog/informational-copy/informational-copy.component';
import { ApproverComponent } from './component/dialog/approver/approver.component';
import { CostCenterComponent } from './component/dialog/cost-center/cost-center.component';
import { AccountComponent } from './component/dialog/account/account.component';
import { SupplierComponent } from './component/dialog/supplier/supplier.component';
import { SiteContactComponent } from './component/dialog/site-contact/site-contact.component';
import { PrintComponent } from './component/print/print.component';
import { CorpHwSwJobTriggerComponent } from './component/corp-hw-sw-job-trigger/corp-hw-sw-job-trigger.component';
import { HelpPageComponent } from './component/help-page/help-page.component';
import { AllDocumentsComponent } from './component/all-documents/all-documents.component';
import { SearchComponent } from './component/search/search.component';
import { NewCorpHwSwErfeComponent } from './component/new-corp-hw-sw-erfe/new-corp-hw-sw-erfe.component';
import { HttpModule } from '@angular/http';
import { CorpHwSwRoutingModule } from './corp-hw-sw.routing';
import { CorpHwSwComponent } from './corp-hw-sw.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
import { AlertModule, TimepickerModule } from 'ngx-bootstrap';
import { CalendarModule, CheckboxModule, EditorModule, RadioButtonModule, ToggleButtonModule, CardModule, ButtonModule, DialogModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TableModule } from 'primeng/table';
import { UnauthorizedComponent } from './component/unauthorized/unauthorized.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { NgBusyModule } from 'ng-busy';
import { DownMaintenanceComponent } from './component/down-maintenance/down-maintenance.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    // Root component
    CorpHwSwComponent,

    // feature components
    HeaderComponent,
    HomePageComponent,
    SearchComponent,
    NewCorpHwSwErfeComponent,
    AllDocumentsComponent,
    HelpPageComponent,
    PrintComponent,
    AdminComponent,

    // Regulatory
    UnauthorizedComponent,
    NotFoundComponent,
    DownMaintenanceComponent,

    // Dialog box/lookups
    SiteContactComponent,
    SupplierComponent,
    AccountComponent,
    CostCenterComponent,
    ApproverComponent,
    InformationalCopyComponent,

    // Job trigger
    CorpHwSwJobTriggerComponent,
  ],
  imports: [
    CorpHwSwRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    NgBusyModule,
    TableModule,
    CardModule,
    TooltipModule,
    ButtonModule,
    DialogModule,
    MessagesModule,
    MessageModule,
    // CalendarModule, CheckboxModule, EditorModule, RadioButtonModule, ToggleButtonModule,
    // AlertModule, TimepickerModule,
  ],
})
export class CorpHwSwModule {
  constructor() { }
}
