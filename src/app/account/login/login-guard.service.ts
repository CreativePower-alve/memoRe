import {Injectable} from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthTokenService } from '../../shared/authToken.service';

@Injectable()
export class LoginGuard implements CanActivate {
	constructor(private _router:Router, private authService: AuthTokenService){	
	}

	canActivate(): any{
		 if (this.authService.isLoggedIn()) {
            this._router.navigate(["/things"]);
            return false;
        } else {
            return true;
        }
	}
}