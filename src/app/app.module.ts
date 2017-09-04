import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideNavComponent } from './side-nav/side-nav.component';

import 'hammerjs';
import { ThingsModule } from './things/things.module';
import { ThingsSessionModule } from './things-session/things-session.module';
import { AccountModule } from './account/account.module';
import { ThingsSessionService } from './shared/things-session.service';
import { TagsService } from './shared/tags.service';
import { ToastService } from './shared/toast.service';
import { AuthTokenService } from './shared/authToken.service';

import { httpFactory } from "./config/http.factory";

import {ThingsGuard} from './things/things-guard.service';
import {LoginGuard} from './account/login/login-guard.service';
import { GoogleComponent } from './google/google.component';
  
@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SideNavComponent,
    GoogleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThingsModule,
    ThingsSessionModule,
    SharedModule,
    AccountModule
  ],
  providers: [ThingsSessionService,
    TagsService,
    ToastService,
    ThingsGuard,
    LoginGuard,
    AuthTokenService,
     {
            provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions, Router]
     }],
  bootstrap: [AppComponent],
  exports: [TopBarComponent, MaterialModule]
})
export class AppModule { }
