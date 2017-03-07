import { Component, OnInit, HostListener } from '@angular/core';
import { ThingsSessionService, SessionConfig, SessionMode } from '../shared/things-session.service';
import {ThingsService} from '../things/things.service';

@Component({
  selector: 'memore-things-session',
  templateUrl: './things-session.component.html',
  styleUrls: ['./things-session.component.scss']
})
export class ThingsSessionComponent implements OnInit {
  isSession: boolean = false;
  isSessionEnd: boolean = false;
  config: SessionConfig;
  currentItem;
  currentIndex = 0;
  private practiceItems: any[];
  private allThings: any[];
  constructor(private thingsSessionService: ThingsSessionService,
    private thingsService:ThingsService) { }

  ngOnInit() {
    this.thingsService.getThings()
     .subscribe(allThings => {
        this.allThings = allThings;
        this.startSession();
     });
  }

  @HostListener('window:beforeunload')
  askForConfirmation() {
    return window.confirm('Do you really want to refresh? Your session will be lost');
  }

  startSession() {
      this.config= this.thingsSessionService.getSessionConfig();
      if (!this.config) {
        return;
      }
      this.isSession = true;
      this.practiceItems = this.getPracticeItems(this.config.isSessionMode);
      this.currentItem = this.practiceItems[this.currentIndex];
  }

  getNextItem() {
    if(this.practiceItems.length -1 === this.currentIndex) {
      this.currentIndex = 0;
    }
    else {
      this.currentIndex++;
    }
    this.currentItem = this.practiceItems[this.currentIndex]; 
  }

  private getPracticeItems(sessionMode) {
    let sessionItems = [];
    if(sessionMode == SessionMode.INPUT) {
      return [this.config.input];
    }
    if(!this.config.tags.length) {
      return this.allThings;
    }
    this.config.tags.forEach(tag => {
       const thingsByTag = this.allThings.filter(thing => thing.tags.indexOf(tag.id) !== -1);
       sessionItems = thingsByTag.length ? sessionItems.concat(thingsByTag): sessionItems; 
    });
    return sessionItems;
  }
}
