import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { ThingsSessionService, SessionConfig } from './shared/things-session.service';
import { LoginService } from './account/login/login.service';
import { AuthTokenService } from './shared/authToken.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isOpen: boolean;
  canShowNavBarButtons = true;

  constructor(private router: Router,
   private thingsSessionService: ThingsSessionService,
   public auth: LoginService,
   private authTokenService: AuthTokenService){
  }

  ngOnInit() {
    if (this.authTokenService.isLoggedIn()) {
      this.auth.checkAuthenticationStatus().subscribe(() => {
        if(this.auth.isAuthenticated()){
        this.isOpen = window.innerWidth > 600;  
       }
      });
    }
    this.router.events.subscribe(()=> {
       if(this.auth.isAuthenticated()){
          this.isOpen = window.innerWidth > 600;  
        }
        this.canShowNavBarButtons = location.pathname !== '/things-session';
        this.isOpen = this.canShowNavBarButtons ? this.isOpen : false;
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
  logout(): void {
       this.auth.logout();
       this.isOpen = false;
       this.router.navigate(['/login']); 
  }
}
