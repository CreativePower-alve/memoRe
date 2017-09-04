import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { TagInputModule } from 'ngx-chips';

import { SessionConfigComponent } from './open-session-dialog/session-config/session-config.component';
import { OpenSessionDialogComponent } from './open-session-dialog/open-session-dialog.component';

@NgModule({
    declarations: [ SessionConfigComponent, OpenSessionDialogComponent ],
    imports: [ 
      CommonModule, 
      MaterialModule,
      FormsModule,
      TagInputModule
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
