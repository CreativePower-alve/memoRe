import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { ThingsSessionService, SessionConfig } from './shared/things-session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isOpen: boolean;
  canShowNavBarButtons = true;
  loggedIn = true;

  constructor(private router: Router,
   private thingsSessionService: ThingsSessionService){
  }

  ngOnInit() {
    this.isOpen = window.innerWidth > 600;
    this.router.events.subscribe(()=> {
      this.canShowNavBarButtons = location.pathname !== '/things-session';
    });
  }

  openMenu(isOpen) {
	  this.isOpen = isOpen;
  }

  startTypingSession(confObject: SessionConfig): void {
  	this.thingsSessionService.setSessionConfig(confObject);
  	if(confObject) {
       this.router.navigate(['/things-session']);
  	}
  }
}
