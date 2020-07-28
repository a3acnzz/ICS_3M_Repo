import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './component/admin/admin.component';
import {AdminLocationComponent} from './component/admin/location/admin-location.component';
import {ProgramOwnerComponent} from './component/program-owner/program-owner.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {ProgramOwnerLocationComponent} from './component/program-owner/location/program-owner-location.component';
import {LocationProgramComponent} from './component/program-owner/location/program/location-program.component';
import {SignUpLocationComponent} from './component/sign-up/location/sign-up-location.component';
import {AuthGuardService} from './service/base/auth.guard.service';
import {UnauthorizedComponent} from './component/unauthorized/unauthorized.component';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {MyAppointmentsComponent} from './component/my-appointments/my-appointments.component';
import {ManageAdminComponent} from './component/admin/manage-admin/manage-admin.component';
import {ProgramAppointmentsComponent} from './component/program-owner/location/program/appointments/program-appointments.component';
import {DownMaintenanceComponent} from './component/down-maintenance/down-maintenance.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/sign-up',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    data: {roles: ['ROLE_USER']}
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['ROLE_USER']}
  },
  {
    path: 'sign-up/location/:locationCode',
    component: SignUpLocationComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['ROLE_USER']}
  },
  {
    path: 'my-appointments',
    component: MyAppointmentsComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['ROLE_USER']}
  },
  {
    path: 'program-owner/location/:locationId/program/:programId/appointments',
    component: ProgramAppointmentsComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN']}
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['ROLE_ADMIN']}
  },
  {
    path: 'admin/location/:id',
    component: AdminLocationComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['ROLE_ADMIN']}
  },
  {
    path: 'admin/manage-admin',
    component: ManageAdminComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['ROLE_ADMIN']}
  },
  {
    path: 'program-owner',
    component: ProgramOwnerComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN']}
  },
  {
    path: 'program-owner/location/:locationId',
    component: ProgramOwnerLocationComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN']}
  },
  {
    path: 'program-owner/location/:locationId/program/:programId',
    component: LocationProgramComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['ROLE_PROGRAM_OWNER', 'ROLE_ADMIN']}
  },
  {
    path: 'down-maintenance',
    component: DownMaintenanceComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [AuthGuardService],
    data: {roles: ['ROLE_USER']}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
