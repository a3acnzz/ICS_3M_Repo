import {NgModule} from '@angular/core';
import {Animations} from '../../shared/animation/animations';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NotAuthorizedComponent} from './not-authorized.component';
import {NotAuthorizedRoutingModule} from './not-authorized.routing';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NotAuthorizedRoutingModule
  ],
  declarations: [
    NotAuthorizedComponent
  ],
  providers: [
    Animations
  ]
})
export class NotAuthorizedModule {
}
