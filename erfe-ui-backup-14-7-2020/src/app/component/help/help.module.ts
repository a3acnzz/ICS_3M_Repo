import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './help.component';
import { ErfeMaterialModule } from 'src/app/erfe-material.module';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { HelpRouting } from './help.routing';

@NgModule({
  declarations: [HelpComponent],
  imports: [
    ErfeMaterialModule,
    CommonModule,
    TableModule,
    CardModule,
    HelpRouting
  ]
})
export class HelpModule { }
