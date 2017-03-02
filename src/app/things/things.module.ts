import { NgModule } from '@angular/core';
import { ThingsComponent } from './things.component';
import { ThingsChildrenModule } from './children/things-children.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
imports: [
SharedModule,
ThingsChildrenModule
],
declarations: [
ThingsComponent
]
})
export class ThingsModule {};