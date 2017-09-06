import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ThingsSessionService, SessionConfig, SessionMode } from '../shared/things-session.service';
import { ThingsService } from '../things/things.service';

@Component({
  selector: 'memore-things-session',
  templateUrl: './things-session.component.html',
  styleUrls: ['./things-session.component.scss']
})
export class ThingsSessionComponent implements OnInit {
  isSession: boolean = true;
  config: SessionConfig;
  currentItem;
  currentIndex = 0;
  timeInSession;
  private practiceItems: any[] = [];
  private allThings: any[] = [];
  private sessionTimeout;
  private startOfSessionTime;

  constructor(
    public thingsSessionService: ThingsSessionService,
    private thingsService: ThingsService,
    private router: Router) { }

  ngOnInit() {
    this.thingsService.getThings()
      .subscribe(allThings => {
        this.allThings = allThings;
        this.startSession();
      });
  }

  @HostListener('window:beforeunload')
  askForConfirmation() {
    if (this.isSession) {
      return window.confirm('Do you really want to refresh? Your session will be lost');
    }
    return true;
  }

  startSession() {
    this.config = this.thingsSessionService.getSessionConfig() || { input: "", isSessionMode: 0, sessionTime: 10, tags: [] };
    if (!this.config) {
      return;
    }
    this.isSession = true;
    this.practiceItems = this.getPracticeItems(this.config.isSessionMode);
    this.startOfSessionTime = new Date().getTime();
    this.sessionTimeout = setTimeout(() => {
      this.stopSession();
    }, this.config.sessionTime * 60 * 1000);

  }

  getNextItem() {
    if (this.practiceItems.length - 1 === this.currentIndex) {
      this.currentIndex = 0;
      // need to regenerate the list when there
      // is only one item, to start typing again
      if (this.practiceItems.length === 1) {
        this.currentIndex = 0;
        this.practiceItems = [Object.assign({}, this.practiceItems[0])];
      }
    }
    else {
      this.currentIndex++;
    }
  }

  private getPracticeItems(sessionMode) {
    let sessionItems = [];
    if (sessionMode == SessionMode.INPUT) {
      return [{ text: this.config.input, source: 'user input' }];
    }
    if (!this.config.tags.length) {
      return this.allThings;
    }
    this.config.tags.forEach(tag => {
      const thingsByTag = this.allThings.filter(thing => thing.tags.indexOf(tag.id) !== -1);
      sessionItems = thingsByTag.length ? sessionItems.concat(thingsByTag) : sessionItems;
    });
    return sessionItems;
  }

  stopSession() {
    this.isSession = false;
    clearTimeout(this.sessionTimeout);
    this.timeInSession = Math.floor((new Date().getTime() - this.startOfSessionTime) / 60000);
  }

}
