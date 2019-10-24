import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatFormFieldModule, MatStepperModule} from '@angular/material';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {COMPONENTS, DIRECTIVES, PIPES} from './index';

import {FooterModule} from './modules/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatStepperModule,
    NgZorroAntdMobileModule,
    SwiperModule,
    FooterModule.forRoot()
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatStepperModule,
    NgZorroAntdMobileModule,
    SwiperModule,
    FooterModule,
    ...DIRECTIVES,
    ...COMPONENTS,
    ...PIPES
  ],
  declarations: [...DIRECTIVES, ...COMPONENTS, ...PIPES],
  entryComponents: [COMPONENTS]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: ThemeModule,
      providers: []
    };
  }
}
