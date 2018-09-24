import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {SigninComponent} from './auth/signin/signin.component';
import {SignupComponent} from './auth/signup/signup.component';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
