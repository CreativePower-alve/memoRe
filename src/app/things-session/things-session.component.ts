import { Component, OnInit } from '@angular/core';
import { ThingsSessionService, SessionConfig } from '../shared/things-session.service';


@Component({
  selector: 'memore-things-session',
  templateUrl: './things-session.component.html',
  styleUrls: ['./things-session.component.scss']
})
export class ThingsSessionComponent implements OnInit {
  isSession: boolean = false;
  isSessionEnd: boolean = false;
  constructor(private thingsSessionService: ThingsSessionService) { }

  ngOnInit() {

    this.startSession();
  }

  startSession() {
      const config: SessionConfig = this.thingsSessionService.getSessionConfig();
      console.log(config); //:todo handle session configuration based on given parameters
  }

}
