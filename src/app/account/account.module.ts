import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { LoginService } from './login/login.service';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
@NgModule({
	imports: [
	  SharedModule,
    RouterModule
	],
	declarations: [
	  LoginComponent,
    SignupComponent,
    ProfileComponent
    ],
    providers: [
      LoginService
    ],
    exports:[ 
       LoginComponent,
       SignupComponent,
       ProfileComponent
    ]
})
export class AccountModule {};