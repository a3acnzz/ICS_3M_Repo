import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SessionExpiredComponent} from './session-expired.component';

const SessionExpiredRoutes: Routes = [
  {
    path: '',
    component: SessionExpiredComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(SessionExpiredRoutes)],
  exports: [RouterModule]
})
export class SessionExpiredRoutingModule {
}
