import { Component, OnInit } from '@angular/core';
import { loginService } from '../login/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'memore-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
   signupInvalid = false;
   constructor(private loginService:loginService, private router:Router) {
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
