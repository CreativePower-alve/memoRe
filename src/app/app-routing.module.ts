import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThingsComponent } from './things/things.component';
import { LoginComponent } from './account/login/login.component';
import { ThingsSessionComponent } from './things-session/things-session.component';

@NgModule({
	imports: [
	RouterModule.forRoot([
	{ path: 'login', component: LoginComponent },	
	{ path: 'things', component: ThingsComponent },
	{ path: 'things-session', component: ThingsSessionComponent },
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: '**', redirectTo: 'login', pathMatch: 'full' }
	])
	],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}; 