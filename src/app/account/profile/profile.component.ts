import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
