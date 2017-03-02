import { Component, OnInit} from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'memore-thing-details',
  templateUrl: './thing-details.component.html',
  styleUrls: ['./thing-details.component.scss']
})
export class ThingDetailsComponent implements OnInit {
  readOnly : boolean;
  data;
  thing;
  newTag;
  constructor(public dialogRef: MdDialogRef<ThingDetailsComponent>) { }

  ngOnInit() {
  	this.data = this.dialogRef.componentInstance.data;
  	this.readOnly = this.data.isReadOnly;
    this.thing = this.data.thing;
  }

  onClose() {
  	this.dialogRef.close(this.thing);
  }

  addTag() {
      this.thing.tags = this.thing.tags.concat([this.newTag]);
      this.newTag = '';
  }

  canAddTag() {
    return this.newTag && this.thing.tags.length ? this.thing.tags.indexOf(this.newTag) === -1 : this.newTag;
  }

  switchToEditMode() {
    this.readOnly = false;
  }

}
