import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isOpen: boolean = false;
  title = 'app works!';
  loggedIn = true;

  constructor(private router: Router){}

  openMenu(isOpen) {
	  this.isOpen = isOpen;
  }

  startTypingSession(confObject) {
  	console.log(confObject);
  	if(confObject) {
       this.router.navigate(['/things-session']);
  	}
  }
}
