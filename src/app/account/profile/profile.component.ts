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
  avatar;
  currentPassword;
  newPassword;
  mouseoverLogin;
  updateInvalid;
  errorMessage;
  uploadFile;
  constructor(public auth: LoginService) { }

 ngOnInit() {
 }

 updatePassword() {
    this.auth
    .changePassword(this.currentPassword, this.newPassword)
    .subscribe(() => {}, () => {
       this.errorMessage = "incorrect password";
    });
  }
  updateProfileData() {
    console.log('prof avatar',this.avatar);
    this.auth
    .updateProfile(this.name, this.email, this.avatar)
    .subscribe(() => {}, () => {
       this.errorMessage = "incorrect data";
    });
  }
    fileChanged(e: Event) {
      const target: HTMLInputElement = e.target as HTMLInputElement;
      let file = target.files[0];
      let reader = new FileReader();
       
        if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           this.avatar = "";
       }
        reader.onloadend = function () {
           this.avatar = reader.result;
       }.bind(this);
    }
}
