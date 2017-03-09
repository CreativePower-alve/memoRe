import { Component, 
	OnInit,
	EventEmitter,
	Output,
	Input
} from '@angular/core';
import {loginService} from '../account/login/login.service';
import {IUser} from '../account/login/user.model';
@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
	@Input() isMenuClosed: boolean;
	@Input() isOpen: boolean;
  @Input() loggedUser: IUser;
	@Input() canShowNavBarButtons: boolean;
	@Output() onOpenMenu = new EventEmitter();
  @Output() logout = new EventEmitter();
	@Output() onStartTypingSession = new EventEmitter();
  
  constructor( private auth:loginService) { }

  ngOnInit() {
  	 this.auth.checkAuthenticationStatus().subscribe();
  }



  toggleSideNav() {
	  this.isOpen = !this.isOpen;
	  this.onOpenMenu.emit(this.isOpen);
  }

  startSession(result) {
     this.onStartTypingSession.emit(result);
  }
  logoutUser() {
     this.logout.emit();
  }
}
