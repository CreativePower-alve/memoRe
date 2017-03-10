import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThingsComponent } from './things/things.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { ThingsSessionComponent } from './things-session/things-session.component';
import {ThingsGuard} from './things/things-guard.service';
import {LoginGuard} from './account/login/login-guard.service';
@NgModule({
	imports: [
	RouterModule.forRoot([
	{ path: 'login', 
	  canActivate: [LoginGuard],		
	  component: LoginComponent },	
    { path: 'signup', 
	  canActivate: [LoginGuard],		
	  component: SignupComponent },	
	{ path: 'things', 
	  canActivate: [ThingsGuard],	
	  component: ThingsComponent },
	{ path: 'things-session',
	  canActivate: [ThingsGuard],	
	  component: ThingsSessionComponent },
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: '**', redirectTo: 'login', pathMatch: 'full' }
	])
	],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}; 