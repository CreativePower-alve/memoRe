import { Component, OnInit } from '@angular/core';
import { ThingsSessionService, SessionConfig } from '../shared/things-session.service';
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

  startSession() {
      this.config= this.thingsSessionService.getSessionConfig();
      if (!this.config) {
        return;
      }
      this.isSession = true;
  }

  getPracticeItems() {
    
  }

}
