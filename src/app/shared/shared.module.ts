import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { TagInputModule } from 'ng2-tag-input';

@NgModule({
    declarations: [  ],
    imports: [ CommonModule, MaterialModule.forRoot()],
    exports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        TagInputModule
    ]
})
export class SharedModule { }
