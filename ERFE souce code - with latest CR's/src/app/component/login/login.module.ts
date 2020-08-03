import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { DropdownModule, InputTextModule, CardModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    DropdownModule,
    InputTextModule,
    FormsModule,
    CardModule
  ]
})
export class LoginModule { }
