import { NgModule } from '@angular/core';
import { ThingComponent } from './thing/thing.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	imports: [SharedModule],
	declarations: [
	 ThingComponent
	 ],
	exports: [
	 ThingComponent
	 ]
})
export class ThingsChildrenModule {};