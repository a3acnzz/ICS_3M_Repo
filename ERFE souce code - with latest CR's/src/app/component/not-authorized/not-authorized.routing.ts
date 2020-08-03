import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotAuthorizedComponent} from './not-authorized.component';

const NotAuthorizedRoutes: Routes = [
  {
    path: '',
    component: NotAuthorizedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(NotAuthorizedRoutes)],
  exports: [RouterModule]
})
export class NotAuthorizedRoutingModule {
}
