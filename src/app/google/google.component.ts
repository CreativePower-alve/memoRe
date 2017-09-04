import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from '../shared/authToken.service';
import { Router } from '@angular/router';


@Component({
  selector: 'memore-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent implements OnInit {

  constructor(private authService: AuthTokenService, private router: Router) { }

  ngOnInit() {
  	const token = window.location.search.split('token=')[1];
    this.authService.setToken(token);
    this.router.navigate(['things']);
  }

}
