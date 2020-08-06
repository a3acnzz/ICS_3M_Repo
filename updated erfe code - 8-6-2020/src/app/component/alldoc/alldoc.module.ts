import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgBusyModule } from 'ng-busy';
import { AlldocRoutingModule } from './alldoc-routing.module';
import { AlldocComponent } from './alldoc.component';
import { TableModule } from 'primeng/table';
import { Animations } from 'src/app/shared/animation/animations';
import { AllDocService } from 'src/app/service/component/alldoc-service';


@NgModule({
  declarations: [AlldocComponent],
  imports: [
    CommonModule,
    AlldocRoutingModule,
    TableModule,
    NgBusyModule
  ],
  providers: [
    Animations,    
    AllDocService,
  ]

})
export class AlldocModule { }
