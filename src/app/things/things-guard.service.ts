import {Injectable} from '@angular/core';
import {CanActivate,Router} from '@angular/router';
@Injectable()
export class ThingsGuard implements CanActivate {
	constructor(private _router:Router){	
	}

	canActivate(): any{
		if(!JSON.parse(localStorage.getItem("user"))){
				this._router.navigate(['/login']);
				return false;
		}
		return true;
	}
}