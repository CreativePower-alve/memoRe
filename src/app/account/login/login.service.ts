import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers} from '@angular/http';
import {IUser} from './user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { AuthTokenService } from '../../shared/authToken.service';
import { environment } from '../../../environments/environment';
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
        window.location.href = `${environment.serverURL}/auth/google`;
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

  changePassword(oldPassword, newPassword) {
    return this.http
      .put(`/api/users/${this.currentUser._id}/password`, {
        oldPassword,
        newPassword
      })
      .catch(this.handleError);
  }
   updateProfile(name, email, avatar) {
    
        let formData:FormData = new FormData();
        if(avatar){
            formData.append('avatar', avatar, avatar.name);
        }
       
        formData.append('name', name);
         formData.append('email', email);
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append("Content-Type", "multipart/form-data");
       
    return this.http
      .put(`/api/users/${this.currentUser._id}/profile`, formData, options)
      .catch(this.handleError);
       // xhr.open("PUT", `/api/users/${this.currentUser._id}/profile`, true);
       // xhr.send(formData);
  }

}
