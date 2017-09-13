import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute,ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Component({
  selector: 'memore-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	console.log(window.location);
  }

}
