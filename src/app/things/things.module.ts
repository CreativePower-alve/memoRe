import { NgModule } from '@angular/core';
import { ThingsComponent } from './things.component';
import { ThingsChildrenModule } from './children/things-children.module';
import { SharedModule } from '../shared/shared.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ThingsData } from './things-data';

import { ThingsService } from './things.service';

@NgModule({
	imports: [
	  SharedModule,
	  ThingsChildrenModule,
	  InMemoryWebApiModule.forRoot(ThingsData)
	],
	declarations: [
	  ThingsComponent
    ],
    providers: [
      ThingsService
    ]
})
export class ThingsModule {};