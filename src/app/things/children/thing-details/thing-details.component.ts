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
  tags;
  eventType;
  constructor(public dialogRef: MdDialogRef<ThingDetailsComponent>) { }

  ngOnInit() {
    this.eventType = EventType;
    this.tags = ['quotes'];
  	this.data = this.dialogRef.componentInstance.data;
  	this.readOnly = this.data.isReadOnly;
    this.thing = this.data.thing;
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

  onTagAdded(aTag) {
      this.thing.tags = this.thing.tags.concat([aTag.value]);
  }

  onTagRemoved(aTag: string) {
     this.thing.tags = this.thing.tags.filter((tag) => tag !== aTag);
  }

}
