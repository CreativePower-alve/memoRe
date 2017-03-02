import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThingsComponent } from './things/things.component';

@NgModule({
	imports: [
	RouterModule.forRoot([
	{ path: 'things', component: ThingsComponent },
	{ path: '', redirectTo: 'things', pathMatch: 'full' },
	{ path: '**', redirectTo: 'things', pathMatch: 'full' }
	])
	],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}; 