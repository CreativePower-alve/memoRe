import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideNavComponent } from './side-nav/side-nav.component';

import 'hammerjs';
import { ThingsComponent } from './things/things.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SideNavComponent,
    ThingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
     RouterModule.forRoot([
      { path: 'things', component: ThingsComponent },
      { path: '', redirectTo: 'things', pathMatch: 'full' },
      { path: '**', redirectTo: 'things', pathMatch: 'full' }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [TopBarComponent]
})
export class AppModule { }
