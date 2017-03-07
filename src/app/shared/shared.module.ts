import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { TagInputModule } from 'ng2-tag-input';

import { SessionConfigComponent } from './open-session-dialog/session-config/session-config.component';
import { OpenSessionDialogComponent } from './open-session-dialog/open-session-dialog.component';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import {FakeData} from './fake.data';

@NgModule({
    declarations: [ SessionConfigComponent, OpenSessionDialogComponent ],
    imports: [ 
      CommonModule, 
      MaterialModule.forRoot(),
      FormsModule,
      TagInputModule,
     // InMemoryWebApiModule.forRoot(FakeData)
     ],
    exports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        TagInputModule,
        OpenSessionDialogComponent
    ],
    entryComponents: [SessionConfigComponent]
})
export class SharedModule { }
