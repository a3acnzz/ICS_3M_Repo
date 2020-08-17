import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ErfeMaterialModule } from 'src/app/erfe-material.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    ErfeMaterialModule,
    CommonModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
