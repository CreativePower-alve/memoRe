import {Injectable} from '@angular/core';
import { CanActivate, Router, ActivatedRoute,ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { LoginService } from "../login/login.service";
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ResetPasswordGuard implements CanActivate {
	constructor(private route: ActivatedRoute, private _router:Router, private auth: LoginService){	
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
		const token = state.url.split('token=')[1];
		return this.auth.resetPassword(token)
			.map((resp,err) =>{
					if(resp.status == 200){
		        		return true;	
		        	}	
			 }).catch((error: any) => {
	            this._router.navigateByUrl('/login');
	            return Observable.of(false);
	        });
	}
}