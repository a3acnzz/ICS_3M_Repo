import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenewalRoutingModule } from './renewal-routing.module';
import { RenewalComponent } from './renewal.component';
import {TableModule} from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RenewalListComponent } from './renewal-list/renewal-list.component';
import { NgBusyModule } from 'ng-busy';
@NgModule({
  declarations: [RenewalComponent, RenewalListComponent],
  imports: [
    CommonModule,
    RenewalRoutingModule,
    TableModule,
    FormsModule,
    NgBusyModule,
    ReactiveFormsModule
  ]
})
export class RenewalModule { }
