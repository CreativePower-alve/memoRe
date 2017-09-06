import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'memore-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
   signupInvalid = false;
   name : string;
   email :string;
   password:string;
   confirmPassword:string;
   mouseoverLogin;
   constructor(private loginService:LoginService, private router:Router) {
   }

  ngOnInit() {
  }

    signup(formValues) { 

    this.loginService.signupUser(formValues.name, formValues.email, 
    	formValues.password,formValues.confirmPassword).subscribe(resp =>{
    		if(!resp){
    			this.signupInvalid = true;
    		}else{
    		   this.router.navigate(['things']);				
    		}
    	});
  } 

}
