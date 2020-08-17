import { NgModule } from '@angular/core';
import { HomeRouting } from './home.routing';
import { Animations } from '../../shared/animation/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';
import { DialogService } from '../../service/dialog/dialog.service';
import { CardModule } from 'primeng/card';
import { AppModule } from 'src/app/app.module';
import { NgBusyModule } from "ng-busy";

@NgModule({
  imports: [
    HomeRouting,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    CardModule,
    AlertModule.forRoot(),
    AppModule,
    NgBusyModule,
  ],
  declarations: [
  ],
  providers: [
    DialogService,
    Animations
  ]
})
export class HomeModule {
}
