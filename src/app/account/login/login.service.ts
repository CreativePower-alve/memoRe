import { Injectable } from '@angular/core';
import {Config} from '../../config/constants';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {IUser} from './user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class loginService {
    
    private authUrl = Config.serverURL+'/auth/local';
    private identityUrl = Config.serverURL+'/api/users/me';
    public currentUser:IUser; 

    constructor(private http: Http) {}

  public loginUser(email:String, password:string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let loginInfo = {email:email, password:password};
        return this.http.post(this.authUrl, loginInfo, options).do(resp =>{
                if(resp){
                  this.currentUser = <IUser> resp.json();
                   localStorage.setItem("user", JSON.stringify(this.currentUser));
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
     let user = JSON.parse(localStorage.getItem("user")) ||{};
     let headers = new Headers({ 'Content-Type': 'application/json', "Authorization":"Bearer "+ user.token });
     let options = new RequestOptions({ headers: headers });
     
     return this.http.get(this.identityUrl,options)
     .map((response:any) =>{
        if(response._body){
          return response.json();
        }else{
          return {};
        } 
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
   private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}
