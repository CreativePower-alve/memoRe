import { NgModule } from '@angular/core';
import { ThingsSessionChildrenModule } from './children/things-session-children.module';
import { SharedModule } from '../shared/shared.module';

import { ThingsSessionComponent } from './things-session.component';


@NgModule({
	imports: [
	  SharedModule,
	  ThingsSessionChildrenModule,
	],
	declarations: [
	  ThingsSessionComponent
    ],
    providers: [
      
    ]
})
export class ThingsSessionModule {};