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
  currentUser;
  avatarValue;
  constructor(public auth: LoginService) { }

 ngOnInit() {
   this.currentUser = this.auth.getCurrentUser();
   if(this.currentUser){
     this.name = this.currentUser.name;
     this.email = this.currentUser.email;
     if(this.currentUser.avatar){
       this.avatarValue = 'data:image/jpeg;base64,' + this.currentUser.avatar ;
     }
     else{
        this.avatarValue = this.currentUser.gravatar;
     }
   }
 }

 updatePassword() {
    this.auth
    .changePassword(this.currentPassword, this.newPassword)
    .subscribe(() => {}, () => {
       this.errorMessage = "incorrect password";
    });
  }
  updateProfileData() {
    console.log(this.avatar,'here');
    this.auth
      .updateProfile(this.name, this.email, this.avatar)
      .subscribe(() => { }, () => {
        this.errorMessage = "incorrect data";
      });
  }
    fileChanged(e: Event) {
      const target: HTMLInputElement = e.target as HTMLInputElement;
      let file = target.files[0];
      this.avatar = file;

      let reader = new FileReader();
       
        if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           this.avatarValue = "";
       }
        reader.onloadend = function () {
           this.avatarValue = reader.result;

       }.bind(this);
    }

}
