import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'memore-things-session',
  templateUrl: './things-session.component.html',
  styleUrls: ['./things-session.component.scss']
})
export class ThingsSessionComponent implements OnInit {
  isSession: boolean = false;
  isSessionEnd: boolean = false;
  allTags = ['quotes']; // :todo make tags service
  constructor() { }

  ngOnInit() {
  }

  startSession(config) {
      console.log(config); //:todo handle session configuration based on given parameters
  }

}
