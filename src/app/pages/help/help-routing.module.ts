import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HelpCompanyListComponent} from './company/list/list.component';

import {HelpCompanyEditStep0Component} from './company/edit/step0/step0.component';
import {HelpCompanyEditStep1Component} from './company/edit/step1/step1.component';
import {HelpCompanyEditStep2Component} from './company/edit/step2/step2.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'company/list', pathMatch: 'full'
  },
  {
    path: 'company/list',
    component: HelpCompanyListComponent
  },
  {
    path: 'company/edit/step0/:id',
    component: HelpCompanyEditStep0Component
  },
  {
    path: 'company/edit/step1/:id',
    component: HelpCompanyEditStep1Component
  },
  {
    path: 'company/edit/step2/:id',
    component: HelpCompanyEditStep2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule {
}
