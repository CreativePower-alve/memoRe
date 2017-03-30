import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IUser} from './user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { AuthTokenService } from '../../shared/authToken.service';

@Injectable()
export class LoginService {
     private authUrl = '/auth/local';
     private googleUrl = '/auth/google';
    private identityUrl = '/api/users/me';
    private signupUrl = '/api/users/';
    public currentUser:IUser; 


    constructor(private http: Http, private authService: AuthTokenService) {}

  public loginUser(email:String, password:string) {
        let loginInfo = {email:email, password:password};
        return this.http.post(this.authUrl, loginInfo).do(resp =>{
                if(resp){
                  this.currentUser = <IUser> resp.json();
                  this.authService.setToken(this.currentUser.token);
                }
            })
            .catch(error =>{
                return Observable.of(false);
            });
    }

     public googleLogin() {
        return this.http.get(this.googleUrl).do(resp =>{
                if(resp){
                  this.currentUser = <IUser> resp.json();
                   this.authService.setToken(this.currentUser.token);
                }
            })
            .catch(error =>{
                return Observable.of(false);
            });
    }
    public guestLogin(){
        return this.http.post(this.authUrl, {email:"guest@memore.com",password:"guest"}).do(resp =>{
                if(resp){
                  this.currentUser = <IUser> resp.json();
                   this.authService.setToken(this.currentUser.token);
                }
            })
            .catch(error =>{
                return Observable.of(false);
            });
    }

   isAuthenticated(){
      return this.currentUser !== undefined;
   }
   checkAuthenticationStatus(){ 
     return this.http.get(this.identityUrl)
     .map((response:any) =>{
        return response._body ? response.json() : {}; 
     })
     .catch(this.handleError)
     .do(currentUser =>{
        if(!!currentUser.name){
           this.currentUser = currentUser;
        }
     });
   }
   updateCurrentUser(name:string, email:string){
     this.currentUser.name = name;
     this.currentUser.email = email;
   }
    getCurrentUser():IUser{
        return this.currentUser;
    }
   private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
    public signupUser(name:string,email:String, password:string, confirmPassword:string) {
      let signupInfo = {name,email, password, confirmPassword};
      return this.http.post(this.signupUrl, signupInfo).do(resp =>{
              if(resp){
                this.currentUser = <IUser> resp.json();
                 this.authService.setToken(this.currentUser.token);
              }
          })
          .catch(error =>{
              return Observable.of(false);
          });
  }

    logout(){
       this.authService.removeStoredToken();
       this.currentUser = undefined;
    }
}
