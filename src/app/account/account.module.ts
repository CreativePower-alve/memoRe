import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { loginService } from './login/login.service';

@NgModule({
	imports: [
	  SharedModule
	],
	declarations: [
	  LoginComponent
    ],
    providers: [
      loginService
    ],
    exports:[ 
       LoginComponent
    ]
})
export class AccountModule {};