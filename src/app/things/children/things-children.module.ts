import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ThingComponent } from './thing/thing.component';
import { ThingDetailsComponent } from './thing-details/thing-details.component';

@NgModule({
	imports: [SharedModule],
	declarations: [
	 ThingComponent,
	 ThingDetailsComponent
	 ],
	exports: [
	 ThingComponent
	 ],
	 entryComponents: [ThingDetailsComponent]
})
export class ThingsChildrenModule {};