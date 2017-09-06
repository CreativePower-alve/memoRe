import { Component, OnInit } from '@angular/core';
import { LoginService } from "../login/login.service";
@Component({
  selector: 'memore-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  updateProfile;
  name;
  email;
  currentPassword;
  newPassword;
  mouseoverLogin;
  updateInvalid;
  errorMessage;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }
 updatePassword() {
    this.loginService
    .changePassword(this.currentPassword, this.newPassword)
    .subscribe(() => {}, () => {
       this.errorMessage = "incorrect password";
    });
  }
}
