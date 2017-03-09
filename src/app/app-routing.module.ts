import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThingsComponent } from './things/things.component';
import { LoginComponent } from './account/login/login.component';
import { ThingsSessionComponent } from './things-session/things-session.component';
import {ThingsGuard} from './things/things-guard.service';

@NgModule({
	imports: [
	RouterModule.forRoot([
	{ path: 'login', component: LoginComponent },	
	{ path: 'things', 
	  canActivate: [ThingsGuard],	
	  component: ThingsComponent },
	{ path: 'things-session', component: ThingsSessionComponent },
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: '**', redirectTo: 'login', pathMatch: 'full' }
	])
	],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}; 