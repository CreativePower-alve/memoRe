import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { ToastService } from "../../shared/toast.service";

@Component({
  selector: 'memore-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private loginService:LoginService, private toastService: ToastService) { }

  ngOnInit() {
  }
  sendEmail(formValues){
  	   this.loginService.sendEmail(formValues.email).subscribe(resp =>{
    	 	this.toastService.open('Email to reset password has been sent', 'success-toaster');
    	}, () => {
    		this.toastService.open('Something wrong happened', 'error-toaster');
    	});
  }
}
