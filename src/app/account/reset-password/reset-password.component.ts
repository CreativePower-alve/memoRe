import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute,ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { LoginService } from "../login/login.service";
import { ToastService } from "../../shared/toast.service";
@Component({
  selector: 'memore-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
  		private auth: LoginService, 
  		private toastService: ToastService,
  		public route: Router) { }

  ngOnInit() {
  }
	resetPassword(formValues, ){
		const token = this.route.url.split('token=')[1];
		this.auth.resetPass(token,formValues.password, formValues.confirmPassword).subscribe(() => {
          this.toastService.open('Password reset successfully', 'success-toaster');
          this.route.navigate(['login']);
       }, () => {
         this.toastService.open('Password could not be reset', 'error-toaster');
    });
	}
}
