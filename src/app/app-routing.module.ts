import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThingsComponent } from './things/things.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { ProfileComponent } from './account/profile/profile.component';
import { ThingsSessionComponent } from './things-session/things-session.component';
import {ThingsGuard} from './things/things-guard.service';
import {GoogleComponent} from './google/google.component';
import {LoginGuard} from './account/login/login-guard.service';

@NgModule({
	imports: [
	RouterModule.forRoot([
	{ path: 'login', 
	  canActivate: [LoginGuard],		
	  component: LoginComponent },	
	{ path: 'forgot-password', 
	  component: ForgotPasswordComponent },	
	{ path: 'google', 		
	  component: GoogleComponent },	
    { path: 'signup', 
	  canActivate: [LoginGuard],		
	  component: SignupComponent },	
	{ path: 'things', 
	  canActivate: [ThingsGuard],	
	  component: ThingsComponent },
    { path: 'profile', 
	  canActivate: [ThingsGuard],	
	  component: ProfileComponent },
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