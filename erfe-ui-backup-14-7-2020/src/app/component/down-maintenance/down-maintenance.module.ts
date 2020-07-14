import {NgModule} from '@angular/core';
import {Animations} from '../../shared/animation/animations';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DownMaintenanceRoutingModule} from './down-maintenance.routing';
import {DownMaintenanceComponent} from './down-maintenance.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    DownMaintenanceRoutingModule
  ],
  declarations: [
    DownMaintenanceComponent
  ],
  providers: [
    Animations
  ]
})
export class DownMaintenanceModule {
}
