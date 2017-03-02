import { Component,
 OnInit,
  OnChanges,
   Input,
   SimpleChanges,
   ViewChild,
   EventEmitter
} from '@angular/core';

import { MdSidenav } from '@angular/material';

@Component({
  selector: 'memore-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements
 OnInit, OnChanges {
	@Input() isOpen: boolean;
	@ViewChild('sidenav') sidenav: MdSidenav;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
	  if (changes['isOpen']) {
		  this.openSidenav();
     }
  }

  openSidenav() {
	  this.sidenav.toggle();
  }

}
