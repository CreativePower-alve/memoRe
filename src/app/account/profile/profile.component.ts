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
  constructor(public auth: LoginService) { }

 ngOnInit() {
   this.currentUser = this.auth.getCurrentUser();
   if(this.currentUser){
     this.name = this.currentUser.name;
     this.email = this.currentUser.email;
     if(this.currentUser.avatar){
       this.avatar = 'data:image/jpeg;base64,' + this.currentUser.avatar ;
     }
     else{
        this.avatar = this.currentUser.gravatar;
     }
    
     console.log('avatar',this.avatar);
   }
 }
hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
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
