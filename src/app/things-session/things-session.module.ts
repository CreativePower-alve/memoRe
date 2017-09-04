import { NgModule } from '@angular/core';
import { ThingsSessionChildrenModule } from './children/things-session-children.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ThingsSessionComponent } from './things-session.component';


@NgModule({
	imports: [
	  SharedModule,
		ThingsSessionChildrenModule,
		RouterModule
	],
	declarations: [
	  ThingsSessionComponent
    ],
    providers: [
      
    ]
})
export class ThingsSessionModule {};