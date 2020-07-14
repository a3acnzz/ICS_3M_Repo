import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppRoutingModule} from './app-routing.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppRoutingModule);
