import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { LoginService } from './login/login.service';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {ResetPasswordGuard} from './reset-password/reset-password-guard';
@NgModule({
	imports: [
	  SharedModule,
    RouterModule
	],
	declarations: [
	  LoginComponent,
    SignupComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
    ],
    providers: [
      LoginService,
      ResetPasswordGuard
    ],
    exports:[ 
       LoginComponent,
       SignupComponent,
       ProfileComponent
    ]
})
export class AccountModule {};