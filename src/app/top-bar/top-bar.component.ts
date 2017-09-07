import {  Component, 
        	OnInit,
        	EventEmitter,
        	Output,
        	Input,
          OnChanges
       }  from '@angular/core';

import { IUser } from '../account/login/user.model';

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
  hasProfileAccess:boolean;
  
  constructor() { 
  }

  ngOnInit() {
    console.log(this.loggedUser,"loggedUser");
  }

  ngOnChanges(change){
    console.log('change',change);
    if(change['loggedUser'] && change['loggedUser'].currentValue){
        this.hasProfileAccess = this.canSeeProfile(change['loggedUser'].currentValue);  
    }
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
    canSeeProfile(currentUser ){
    if(!currentUser){
      return false;
    }
     return  currentUser.name !== 'guest' 
            && currentUser.name !== 'Admin' 
            && currentUser.provider == "local";   
  }
}
