import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { SessionConfigComponent } from './session-config/session-config.component';
import { TagsService } from '../tags.service';

@Component({
  selector: 'memore-open-session-dialog',
  templateUrl: './open-session-dialog.component.html',
  styleUrls: ['./open-session-dialog.component.scss']
})
export class OpenSessionDialogComponent implements OnInit {
  allTags = [];
  newTagSubscription;
  @Output() onStartSession = new EventEmitter();
  constructor(private dialog: MdDialog,
    private tagsService: TagsService) { }

  ngOnInit() {
    this.tagsService.getAllTags()
      .subscribe(allTags => this.allTags = allTags)
    this.newTagSubscription = this.tagsService.dynamicTagEvent.subscribe(({ tag, action }) => {
      if ('add' === action) {
        this.allTags = this.allTags.concat([tag]);
      }
      else if ('delete' === action) {
        this.allTags = this.allTags.filter(aTag => aTag.id !== tag.id);
      }
    });
  }

  ngOnDestroy() {
    this.newTagSubscription.unsubscribe();
  }

  openSessionConfigDialog() {
    let config: MdDialogConfig = {
      width: '500px'
    }
    let dialogRef: any = this.dialog.open(SessionConfigComponent, config);
    dialogRef.componentInstance.data = {
      tags: this.allTags.slice(0)
    };
    dialogRef.afterClosed().subscribe(result => this.onStartSession.emit(result));
  }

}
