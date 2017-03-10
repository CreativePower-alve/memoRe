import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { loginService } from './login/login.service';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
	imports: [
	  SharedModule
	],
	declarations: [
	  LoginComponent,
    SignupComponent,
    ProfileComponent
    ],
    providers: [
      loginService
    ],
    exports:[ 
       LoginComponent,
       SignupComponent,
       ProfileComponent
    ]
})
export class AccountModule {};