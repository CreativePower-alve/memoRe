import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideNavComponent } from './side-nav/side-nav.component';

import 'hammerjs';
import { ThingsModule } from './things/things.module';
import { LoginComponent } from './account/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SideNavComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AppRoutingModule,
    ThingsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [TopBarComponent, MaterialModule]
})
export class AppModule { }
