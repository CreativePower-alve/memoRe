import { Injectable } from '@angular/core';
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
    private baseUrl = "http://127.0.0.1:9000/auth/local";
    public currentUser:IUser; 
    constructor(private http: Http) {}

  public loginUser(email:String, password:string) {
          let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let loginInfo = {email:email, password:password};
        console.log("making http post call",loginInfo);
        return this.http.post(this.baseUrl, loginInfo, options).do(resp =>{
                if(resp){
                  this.currentUser = <IUser> resp.json();
                }
            })
            .catch(error =>{
                  console.log("http post call error",error);
                return Observable.of(false);
            });
    }
}
