import { Component, OnInit } from '@angular/core';
import { LoginService } from "../login/login.service";
import { ToastService } from "../../shared/toast.service";
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
  constructor(
    public auth: LoginService,
    private toastService: ToastService) { }

 ngOnInit() {
   this.auth.checkAuthenticationStatus().subscribe(() =>{
     this.currentUser = this.auth.getCurrentUser();
     if(this.currentUser){
       this.name = this.currentUser.name;
       this.email = this.currentUser.email;
       if(this.currentUser.avatar){
         this.avatarValue = 'data:image/jpeg;base64,'+ this.currentUser.avatar ;
       }
       else{
          this.avatarValue =  this.currentUser.gravatar;
       }
     }
   });
 }

 updatePassword() {
    this.auth
    .changePassword(this.currentPassword, this.newPassword)
    .subscribe(() => {}, () => {
       this.errorMessage = "incorrect password";
    });
  }
  updateProfileData() {
    this.auth
      .updateProfile(this.name, this.email, this.avatar)
      .flatMap(() => this.auth.checkAuthenticationStatus())
      .subscribe(() => {
            this.toastService.open('Profile updated successfully', 'success-toaster');
         }, () => {
          this.errorMessage = "incorrect data";
           this.toastService.open('Profile could not be updated', 'error-toaster');
      });
  }
    fileChanged(e: Event) {
      const target: HTMLInputElement = e.target as HTMLInputElement;
      let file = target.files[0];
      this.avatar = file;
      let filesize = parseFloat(((file.size/1024)/1024).toFixed(4)); // MB
      if(filesize < 3){
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
      else{
        this.toastService.open('File size too large. Please use images under 3 Mb.','error-toaster');
      }
    
    }

}
