import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DownMaintenanceComponent} from './down-maintenance.component';

const DownMaintenanceRoutes: Routes = [
  {
    path: '',
    component: DownMaintenanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(DownMaintenanceRoutes)],
  exports: [RouterModule]
})
export class DownMaintenanceRoutingModule {
}
