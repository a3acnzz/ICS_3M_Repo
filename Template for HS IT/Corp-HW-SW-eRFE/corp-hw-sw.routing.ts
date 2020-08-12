import { HelpPageComponent } from './component/help-page/help-page.component';
import { CorpHwSwJobTriggerComponent } from './component/corp-hw-sw-job-trigger/corp-hw-sw-job-trigger.component';
import { AllDocumentsComponent } from './component/all-documents/all-documents.component';
import { SearchComponent } from './component/search/search.component';
import { NewCorpHwSwErfeComponent } from './component/new-corp-hw-sw-erfe/new-corp-hw-sw-erfe.component';
import { AuthGuardService } from './../service/base/auth.guard.service';
import { CorpHwSwComponent } from './corp-hw-sw.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { AdminComponent } from './component/admin/admin.component';
import { UnauthorizedComponent } from './component/unauthorized/unauthorized.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { DownMaintenanceComponent } from './component/down-maintenance/down-maintenance.component';

export const routes: Routes = [
  {
    path: '',
    component: CorpHwSwComponent, // this is the component with the <router-outlet> in the template
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'home-page',
        component: HomePageComponent, // another child route component that the router renders
        canActivate: [AuthGuardService],
      },
      {
        path: 'new-rfe-document',
        component: NewCorpHwSwErfeComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'search',
        component: SearchComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'all-documents',
        component: AllDocumentsComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'job-trigger',
        component: CorpHwSwJobTriggerComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'help',
        component: HelpPageComponent,
        canActivate: [AuthGuardService],
      },

      // Regulatory
      {
        path: 'down-maintenance',
        component: DownMaintenanceComponent,
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent,
      },
      {
        path: '**',
        component: NotFoundComponent,
      }
    ],
  },
  {
    path: 'dashboard',
    loadChildren: './../component/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuardService]
  },


  // {
  //   path: 'admin',
  //   component: AdminComponent,
  //   // canActivate: [AuthGuardService],
  //   data: { roles: ['ROLE_ADMIN'] }
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpHwSwRoutingModule {
}
