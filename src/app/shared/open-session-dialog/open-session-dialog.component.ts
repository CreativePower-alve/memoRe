import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { SessionConfigComponent } from './session-config/session-config.component';

@Component({
  selector: 'memore-open-session-dialog',
  templateUrl: './open-session-dialog.component.html',
  styleUrls: ['./open-session-dialog.component.scss']
})
export class OpenSessionDialogComponent implements OnInit {
  allTags=['quotes'];
  @Output() onStartSession = new EventEmitter();
  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  openSessionConfigDialog() {
     let config: MdDialogConfig = {
     disableClose: true,
     width: '500px',
     height: '350px'
    }
    let dialogRef: any = this.dialog.open(SessionConfigComponent, config);
    dialogRef.componentInstance.data = {
       tags: this.allTags.slice(0)
    };
    dialogRef.afterClosed().subscribe(result => this.onStartSession.emit(result));
    }

}
