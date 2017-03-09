import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PracticeItemComponent } from './practice-item/practice-item.component';


@NgModule({
	imports: [SharedModule],
	declarations: [PracticeItemComponent],
	exports: [
      PracticeItemComponent
	]
})
export class ThingsSessionChildrenModule {};