import { Component, OnInit } from '@angular/core';
import { loginService } from './login.service'
import { Router } from '@angular/router'

@Component({
  selector: 'memore-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   loginInvalid = false;
   constructor(private loginService:loginService, private router:Router) {
   }

  ngOnInit() {
  }

   login(formValues) { 

    this.loginService.loginUser(formValues.email, 
    	formValues.password).subscribe(resp =>{
    			console.log("called loginUser from loginService",formValues);
    		if(!resp){
    			this.loginInvalid = true;
    		}else{
    		   this.router.navigate(['things']);				
    		}
    	});
  } 

  cancel() {
    this.router.navigate(['things']);
  }

}
