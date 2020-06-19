import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './service/base/auth.guard.service';
import { HomeComponent } from './component/home/home.component';
import { AdministrationComponent } from './component/administration/administration.component';
import { NotAuthorizedFormComponent } from './component/not-authorized-form/not-authorized-form.component';
import { NoDataFoundComponent } from './component/no-data-found/no-data-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: './component/login/login.module#LoginModule'
  },
  {
    path: 'dashboard',
    loadChildren: './component/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'notAuthorized',
    loadChildren: './component/not-authorized/not-authorized.module#NotAuthorizedModule',
  },
  {
    path: 'downMaintenance',
    loadChildren: './component/down-maintenance/down-maintenance.module#DownMaintenanceModule',
  },
  {
    path: 'sessionExpired',
    loadChildren: './component/session-expired/session-expired.module#SessionExpiredModule',
  },
  {
    path: '',
    component: AdministrationComponent,
    children: [
      {
        path: 'new-rfe-document',
        loadChildren: './component/new-rfe-document/new-rfe-document.module#NewRFEDocumentModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'print-rfe-form',
        loadChildren: './component/print-rfe-form/print-rfe-form.module#PrintRfeFormModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'search',
        loadChildren: './component/corp-ps-search/corp-ps-search.module#CorpPsSearchModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'alldoc',
        loadChildren: './component/alldoc/alldoc.module#AlldocModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'help',
        loadChildren: './component/help/help.module#HelpModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'renewal',
        loadChildren: './component/renewal/renewal.module#RenewalModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'notAuthorizedForm',
        component: NotAuthorizedFormComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'dataNotFound',
        component: NoDataFoundComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'job-trigger',
        loadChildren: './component/job-trigger/job-trigger.module#JobTriggerModule',
        canActivate: [AuthGuardService]
      },
      {
        path: '**',
        redirectTo: '/dashboard',
        pathMatch: 'full',
        canActivate: [AuthGuardService]
      }

    ]

  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
