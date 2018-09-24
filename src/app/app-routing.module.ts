import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {SigninComponent} from './auth/signin/signin.component';

const appRoutes: Routes = [
  { path: 'signin', component: SigninComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
