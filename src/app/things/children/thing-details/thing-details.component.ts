import { Component, OnInit} from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { EventType } from '../../things.component';

@Component({
  selector: 'memore-thing-details',
  templateUrl: './thing-details.component.html',
  styleUrls: ['./thing-details.component.scss']
})
export class ThingDetailsComponent implements OnInit {
  readOnly : boolean;
  data;
  thing;
  tags = [{id:1, name: 'quotes'}];
  eventType;
  constructor(public dialogRef: MdDialogRef<ThingDetailsComponent>) { }

  ngOnInit() {
    this.eventType = EventType;
  	this.data = this.dialogRef.componentInstance.data;
  	this.readOnly = this.data.isReadOnly;
    this.thing = this.data.thing;
    this.tags = this.data.allTags;
  }

  onClose(eventType) {
    const event = {
      event: eventType,
      thing: this.thing
    };
  	this.dialogRef.close(event);
  }

  safeClose() {
    this.dialogRef.close(); 
  }

  saveThing(eventType, thingForm) {
    if (!thingForm.form.invalid ) {
      this.onClose(eventType);
    }
  }

  onTagAdded(aTag) {
      this.thing.tags = this.thing.tags.concat([aTag]);
  }

  onTagRemoved(aTag) {
     this.thing.tags = this.thing.tags.filter((tag) => tag.id !== aTag.id);
  }

}
