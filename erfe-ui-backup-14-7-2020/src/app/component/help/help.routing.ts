import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpComponent } from './help.component';

const homeroutes: Routes = [
  {
    path: '',
    component: HelpComponent,
    data: {
      title: 'Help'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeroutes)],
  exports: [RouterModule]
})
export class HelpRouting { }
