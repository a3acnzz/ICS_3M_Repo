import { ErrorHandler, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ErfeMaterialModule } from './erfe-material.module';
import { AppRoutingModule } from './app-routing.module';
import { Animations } from './shared/animation/animations';
import { AccordionModule, CalendarModule, DropdownModule, FileUploadModule, MultiSelectModule, TabViewModule } from 'primeng/primeng';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './service/base/auth-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationService } from './service/base/navigation.service';
import { BroadcastMessageService } from './service/share/broadcast-message.service';
import { NgBusyModule } from 'ng-busy';
import { ChipsModule } from 'primeng/components/chips/chips';
import { AlertModule, ProgressbarModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SecurityDialogComponent } from './shared/dialog/security/security-dialog.component';
import { InfoDialogComponent } from './shared/dialog/confirm/info-dialog.component';
import { ConfirmDialogComponent } from './shared/dialog/confirm/confirm-dialog.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DatePipe } from '@angular/common';
import { HttpModule } from '@angular/http';

import { DialogService } from './service/dialog/dialog.service';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { AuthGuardService } from './service/base/auth.guard.service';
import { AppErrorHandler } from './service/base/app-error-handler';
import { StoreModule } from '@ngrx/store';
import { HttpService } from './service/base/http.service';
import { SecurityService } from './service/share/security.service';
import { reducers } from './redux/reducers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './service/component/user.service';
import { DraggableDialogDirective } from './shared/directive/draggable.directive';
import { TableModule } from 'primeng/table';
import { ShareService } from './service/share/share.service';
import { HomeComponent } from './component/home/home.component';
import { CookieService } from "ngx-cookie-service";
import { DashboardModule } from "./component/dashboard/dashboard.module";
import { CardModule } from 'primeng/card';
import { AdministrationComponent } from './component/administration/administration.component';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotAuthorizedFormComponent } from './component/not-authorized-form/not-authorized-form.component';
import { NoDataFoundComponent } from './component/no-data-found/no-data-found.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot(),
    RouterModule,
    CardModule,
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ErfeMaterialModule,
    AlertModule.forRoot(),
    TableModule,
    FileUploadModule,
    MultiSelectModule,
    AccordionModule,
    CalendarModule,
    ChipsModule,
    NgBusyModule,
    ProgressbarModule,
    DropdownModule,
    MomentModule,
    DashboardModule,
    StoreModule.forRoot(reducers, {}),
    NgIdleKeepaliveModule.forRoot(),
    TabViewModule,
    TooltipModule.forRoot()
  ],
  declarations: [
    DraggableDialogDirective,
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    SecurityDialogComponent,
    ConfirmDialogComponent,
    InfoDialogComponent,
    HomeComponent,
    AdministrationComponent,
    NotAuthorizedFormComponent,
    NoDataFoundComponent
  ],
  entryComponents: [
    SecurityDialogComponent,
    ConfirmDialogComponent,
    InfoDialogComponent
  ],
  providers: [
    Animations,
    BroadcastMessageService,
    AuthGuardService,
    UserService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    NavigationService,
    AuthGuardService,
    HttpService,
    SecurityService,
    ShareService,
    DialogService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
