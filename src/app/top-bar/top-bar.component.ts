import { Component, 
	OnInit,
	EventEmitter,
	Output,
	Input,
	SimpleChanges
} from '@angular/core';
import {loginService} from '../account/login/login.service';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
	@Input() isMenuClosed: boolean;
	@Input() isOpen: boolean;
	@Input() canShowNavBarButtons: boolean;
	@Output() onOpenMenu = new EventEmitter();
	@Output() onStartTypingSession = new EventEmitter();
  
  constructor( private auth:loginService) { }

  ngOnInit() {
  	 this.auth.checkAuthenticationStatus();
  }


  toggleSideNav() {
	  this.isOpen = !this.isOpen;
	  this.onOpenMenu.emit(this.isOpen);
  }

  startSession(result) {
     this.onStartTypingSession.emit(result);
  }

}
