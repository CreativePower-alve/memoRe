import { Component,
 OnInit,
  OnChanges,
   Input,
   Output,
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
	@Output() onBackdropClick = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
	  if (changes['isOpen'] && 
	  	changes['isOpen'].currentValue) {
		  this.openSidenav();
     }
  }

  openSidenav() {
	  this.sidenav.open();
  }

  handleCloseMenu($event) {
	  this.onBackdropClick.emit($event);
  }

}
