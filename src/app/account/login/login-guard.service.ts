import {Injectable} from '@angular/core';
import {CanActivate,Router} from '@angular/router';
@Injectable()
export class LoginGuard implements CanActivate {
	constructor(private _router:Router){	
	}

	canActivate(): any{
		if(JSON.parse(sessionStorage.getItem("user"))){
				this._router.navigate(['/things']);
				return false;
		}
		return true;
	}
}