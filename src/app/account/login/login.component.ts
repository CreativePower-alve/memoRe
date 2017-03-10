import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'memore-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   loginInvalid = false;
   constructor(private loginService:LoginService, private router:Router) {
   }

  ngOnInit() {
  }

   login(formValues) { 

    this.loginService.loginUser(formValues.email, 
    	formValues.password).subscribe(resp =>{
    		if(!resp){
    			this.loginInvalid = true;
    		}else{
    		   this.router.navigate(['things']);				
    		}
    	});
  } 
  loginGuest() { 
    this.loginService.guestLogin().subscribe(resp =>{
        if(!resp){
          this.loginInvalid = true;
        }else{
           this.router.navigate(['things']);        
        }
      });
  }

}
