import { NgModule } from '@angular/core';
import { ThingsComponent } from './things.component';
import { ThingsChildrenModule } from './children/things-children.module';
import { SharedModule } from '../shared/shared.module';

import { ThingsService } from './things.service';

@NgModule({
	imports: [
	  SharedModule,
	  ThingsChildrenModule
	],
	declarations: [
	  ThingsComponent
    ],
    providers: [
      ThingsService
    ]
})
export class ThingsModule {};