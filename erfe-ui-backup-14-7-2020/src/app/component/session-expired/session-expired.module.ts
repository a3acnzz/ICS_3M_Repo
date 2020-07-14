import {NgModule} from '@angular/core';
import {Animations} from '../../shared/animation/animations';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SessionExpiredComponent} from './session-expired.component';
import {SessionExpiredRoutingModule} from './session-expired.routing';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    SessionExpiredRoutingModule
  ],
  declarations: [
    SessionExpiredComponent
  ],
  providers: [
    Animations
  ]
})
export class SessionExpiredModule {
}
