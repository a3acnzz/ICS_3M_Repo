import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {HttpService} from './service/base/http.service';
import {AdminComponent} from './component/admin/admin.component';
import {HeaderComponent} from './component/header/header.component';
import {AdminLocationComponent} from './component/admin/location/admin-location.component';
import {AlertModule, TimepickerModule} from 'ngx-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProgramOwnerComponent} from './component/program-owner/program-owner.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {CalendarModule, CheckboxModule, EditorModule, RadioButtonModule, ToggleButtonModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {ProgramOwnerLocationComponent} from './component/program-owner/location/program-owner-location.component';
import {LocationProgramComponent} from './component/program-owner/location/program/location-program.component';
import {SingleTimeSlotDialogComponent} from './component/dialog/single-time-slot/single-time-slot-dialog.component';
import {MatDialogModule, MatSlideToggleModule} from '@angular/material';
import {MultipleTimeSlotDialogComponent} from './component/dialog/multiple-time-slot/multiple-time-slot-dialog.component';
import {SignUpLocationComponent} from './component/sign-up/location/sign-up-location.component';
import {ProgramSelectDialogComponent} from './component/dialog/program-select/program-select-dialog.component';
import {ProgramDateSelectDialogComponent} from './component/dialog/program-date-select/program-date-select-dialog.component';
import {EmailTemplateDialogComponent} from './component/dialog/email-template/email-template-dialog.component';
import {AnnouncementDialogComponent} from './component/dialog/announcement/announcement-dialog.component';
import {BccEmailDialogComponent} from './component/dialog/bcc-email/bcc-email-dialog.component';
import {AuthGuardService} from './service/base/auth.guard.service';
import {LoginService} from './service/login.service';
import {SecurityService} from './service/security.service';
import {CookieModule, CookieService} from 'ngx-cookie';
import {LoginActions} from './redux/actions/login-actions';
import {SessionActions} from './redux/actions/session-actions';
import {NgRedux, NgReduxModule} from '@angular-redux/store';
import {rootReducer} from 'app/redux';
import {NgReduxRouterModule} from '@angular-redux/router';
import {AuthInterceptor} from './service/base/auth-interceptor';
import {UnauthorizedComponent} from './component/unauthorized/unauthorized.component';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {ChangeMaxAppointmentsDialogComponent} from './component/dialog/change-max-appointments/change-max-appointments-dialog.component';
import {ProgramCancellationDialogComponent} from './component/dialog/program-cancellation/program-cancellation-dialog.component';
import {MyAppointmentsComponent} from './component/my-appointments/my-appointments.component';
import {UserSearchDialogComponent} from './component/dialog/user-search/user-search-dialog.component';
import {NgBusyModule} from 'ng-busy';
import {ManageAdminComponent} from './component/admin/manage-admin/manage-admin.component';
import {ProgramAppointmentsComponent} from './component/program-owner/location/program/appointments/program-appointments.component';
import {AppointmentCancellationDialogComponent} from './component/dialog/appointment-cancellation/appointment-cancellation-dialog.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ContactUsConfigureDialogComponent} from './component/dialog/contact-us-configure/contact-us-configure-dialog.component';
import {ContactUsViewDialogComponent} from './component/dialog/contact-us-view/contact-us-view-dialog.component';
import {DownMaintenanceComponent} from './component/down-maintenance/down-maintenance.component';
import { PendingAppointmentDialogComponent } from './component/dialog/pending-appointment/pending-appointment-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    AdminLocationComponent,
    ProgramOwnerComponent,
    SignUpComponent,
    ProgramOwnerLocationComponent,
    LocationProgramComponent,
    SingleTimeSlotDialogComponent,
    MultipleTimeSlotDialogComponent,
    SignUpLocationComponent,
    ProgramSelectDialogComponent,
    ProgramDateSelectDialogComponent,
    EmailTemplateDialogComponent,
    AnnouncementDialogComponent,
    BccEmailDialogComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    ChangeMaxAppointmentsDialogComponent,
    ProgramCancellationDialogComponent,
    MyAppointmentsComponent,
    UserSearchDialogComponent,
    ManageAdminComponent,
    ProgramAppointmentsComponent,
    AppointmentCancellationDialogComponent,
    ContactUsConfigureDialogComponent,
    ContactUsViewDialogComponent,
    DownMaintenanceComponent,
    PendingAppointmentDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    TimepickerModule.forRoot(),
    BrowserAnimationsModule,
    TableModule,
    CheckboxModule,
    ToggleButtonModule,
    CalendarModule,
    MatDialogModule,
    MatSlideToggleModule,
    EditorModule,
    NgReduxModule,
    NgReduxRouterModule,
    RadioButtonModule,
    NgBusyModule,
    CookieModule.forRoot(),
    TooltipModule.forRoot()
  ],
  entryComponents: [
    SingleTimeSlotDialogComponent,
    MultipleTimeSlotDialogComponent,
    ProgramSelectDialogComponent,
    ProgramDateSelectDialogComponent,
    EmailTemplateDialogComponent,
    AnnouncementDialogComponent,
    BccEmailDialogComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    ChangeMaxAppointmentsDialogComponent,
    ProgramCancellationDialogComponent,
    UserSearchDialogComponent,
    AppointmentCancellationDialogComponent,
    ContactUsConfigureDialogComponent,
    ContactUsViewDialogComponent,
    PendingAppointmentDialogComponent
  ],
  providers: [
    HttpService,
    AuthGuardService,
    LoginService,
    SecurityService,
    LoginActions,
    SessionActions,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<any>) {
    ngRedux.configureStore(rootReducer, {});
  }
}
