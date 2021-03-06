import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthTokenService{
  token;
  jwtHelper: JwtHelper = new JwtHelper();
  dynamicSideNavEvent = new Subject();

  constructor(){}

  setToken(expToken) {
    localStorage.setItem('token', expToken);
    this.token = expToken;
  }

  getToken() {
    return this.token ? this.token : this.getStoredToken();
  }

  getStoredToken() {
    return localStorage.getItem('token');
  }

  removeStoredToken() {
    localStorage.removeItem('token');
    this.token = undefined;
  }

  isLoggedIn() {
    const token = this.getToken();
    return token ?
      !this.jwtHelper.isTokenExpired(token) :
      false;
  }

}