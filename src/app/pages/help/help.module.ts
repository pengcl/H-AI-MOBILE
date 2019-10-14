import {NgModule} from '@angular/core';
import {HelpRoutingModule} from './help-routing.module';
import {ThemeModule} from '../../@theme/theme.module';

import {HELP_PAGES} from './index';


@NgModule({
  imports: [
    HelpRoutingModule,
    ThemeModule
  ],
  declarations: [HELP_PAGES]
})
export class HelpModule {
}
