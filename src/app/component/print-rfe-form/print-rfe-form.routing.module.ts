import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrintRfeFormComponent } from './print-rfe-form.component';


const routes: Routes = [
  { path: ':corpPsReqNum', component: PrintRfeFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintRfeFormRoutingModule { }
