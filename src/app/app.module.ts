import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule, MatIconModule, MatInputModule,
  MatMenuModule, MatNavList,
  MatProgressSpinnerModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { SigninComponent } from './auth/signin/signin.component';
import {MediaMatcher} from '@angular/cdk/layout';
import {AuthService} from './auth.service';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    [
      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      MatProgressSpinnerModule,
      MatMenuModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatInputModule
    ],
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [MediaMatcher, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
