import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ThingsSessionService, SessionConfig } from './shared/things-session.service';
import { LoginService } from './account/login/login.service';
import { AuthTokenService } from './shared/authToken.service';
import { TagsService } from "./shared/tags.service";

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
    private authTokenService: AuthTokenService,
    private tagService: TagsService) {
  }

  ngOnInit() {
    if (this.authTokenService.isLoggedIn()) {
      this.auth.checkAuthenticationStatus().subscribe(() => {
        this.canShowNavigation();
      });
    }
    this.router.events.subscribe((event) => {
      this.canShowNavigation();
    });
  }

  ngOnDestroy() {
    this.tagService.logoutSubscription.unsubscribe();
  }

  ngAfterContentInit() {
    this.authTokenService.dynamicSideNavEvent
      .take(1)
      .subscribe(() => {
        setTimeout(() => {
          this.isOpen = window.innerWidth > 600 && this.authTokenService.isLoggedIn();
        }, 0);
        this.auth.checkAuthenticationStatus().subscribe();
      });
  }

  canShowNavigation() {
    if (this.auth.isAuthenticated()) {
      this.isOpen = window.innerWidth > 600;
    }
    this.canShowNavBarButtons = location.pathname !== '/things-session';
    this.isOpen = this.canShowNavBarButtons ? this.isOpen : false;
  }

  openMenu(isOpen) {
    this.isOpen = isOpen;
  }

  startTypingSession(confObject: SessionConfig): void {
    this.thingsSessionService.setSessionConfig(confObject);
    if (confObject) {
      this.isOpen = false;
      this.router.navigate(['/things-session']);
    }
  }
  logout(): void {
    this.auth.logout();
    this.isOpen = false;
    this.router.navigate(['/login']);
  }
}
