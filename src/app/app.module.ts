import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ThemeModule} from './@theme/theme.module';
import {INTERCEPTORS} from './@core/interceptors';
import {PAGES} from './pages';

@NgModule({
  declarations: [
    AppComponent,
    ...PAGES
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ThemeModule.forRoot()
  ],
  providers: [INTERCEPTORS,
    {provide: 'PREFIX_URL', useValue: '/api/wisp/intf/call?action='},
    {provide: 'FILE_PREFIX_URL', useValue: '/api/wisp/admin/fileupload/previewFile?id='}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
