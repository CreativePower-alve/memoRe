import {Injectable} from '@angular/core';
import {CanActivate,Router} from '@angular/router';
import {loginService} from '../account/login/login.service';
@Injectable()
export class ThingsGuard implements CanActivate {
	constructor(private _router:Router, private auth: loginService){	
	}

	canActivate(): boolean{
		if(!this.auth.checkAuthenticationStatus()){
			this._router.navigate(['/login']);
			return false;
		}
		return true;
	}
}