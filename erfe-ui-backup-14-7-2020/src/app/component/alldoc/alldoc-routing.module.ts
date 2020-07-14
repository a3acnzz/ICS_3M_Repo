import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlldocComponent } from './alldoc.component';

const routes: Routes = [
  {
    path: '',
    component: AlldocComponent,
    data: {
      title: 'AllDocuments'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlldocRoutingModule { }
