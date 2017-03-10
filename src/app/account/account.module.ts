import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { loginService } from './login/login.service';

@NgModule({
	imports: [
	  SharedModule
	],
	declarations: [
	  LoginComponent,
    SignupComponent
    ],
    providers: [
      loginService
    ],
    exports:[ 
       LoginComponent,
       SignupComponent
    ]
})
export class AccountModule {};