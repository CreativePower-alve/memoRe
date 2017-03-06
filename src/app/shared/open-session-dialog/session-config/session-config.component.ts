import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';
enum SessionMode {
  TAGS,
  INPUT
}

@Component({
  selector: 'memore-session-config',
  templateUrl: './session-config.component.html',
  styleUrls: ['./session-config.component.scss']
})
export class SessionConfigComponent implements OnInit {
  allTags = [];
  data;
  config = {
  	sessionTime : 10,
    isSessionMode: SessionMode.TAGS,
    input: '',
    tags: []
  };
  constructor(public dialogRef: MdDialogRef<SessionConfigComponent>) { }

  ngOnInit() {
    this.data = this.dialogRef.componentInstance.data;
    this.allTags = this.data.tags;
  }

  setSessionMode(value) {
    this.config.isSessionMode = SessionMode[SessionMode[value]];
  }

  onTagAdded(aTag) {
      this.config.tags = this.config.tags.concat([aTag.value]);
  }

  onTagRemoved(aTag: string) {
     this.config.tags = this.config.tags.filter((tag) => tag !== aTag);
  }

  close() {
    this.dialogRef.close(this.config); 
  }

}
