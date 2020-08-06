import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RenewalComponent} from './renewal.component';
import { RenewalListComponent } from './renewal-list/renewal-list.component';
const routes: Routes = [
  {
    path: '',
    component: RenewalListComponent,
    data: {
      title: 'Renewal'
    }
  },
  {
    path:':id',
    component:RenewalComponent,
    data:{
      title:'Renewal'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenewalRoutingModule { }
