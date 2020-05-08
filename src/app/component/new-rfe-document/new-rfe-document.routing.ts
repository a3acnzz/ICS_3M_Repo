import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { NewRFEDocumentComponent } from './new-rfe-document.component';



const newRFEroutes: Routes = [
  {
    path: '',
    component: NewRFEDocumentComponent,
    data: {
      title: 'Create RFE (Request For Expenditure)'
    }
  },
    {
    path: ':input/:action/:id',
    component: NewRFEDocumentComponent,
    data: {
      title: 'Create RFE (Request For Expenditure)'
    }
  }

  
];

@NgModule({
  imports: [RouterModule.forChild(newRFEroutes)],
  exports: [RouterModule]
})
export class NewRFEDocumentRouting {}
