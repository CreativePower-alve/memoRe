import { Component, 
	OnInit,
	EventEmitter,
	Output,
	Input,
	SimpleChanges
} from '@angular/core';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
	@Input() isMenuClosed: boolean;
	@Output() onOpenMenu = new EventEmitter();
	private isOpen: boolean = false;
  constructor() { }

  ngOnInit() {
  }


  toggleSideNav() {
	  this.isOpen = !this.isOpen;
	  this.onOpenMenu.emit(this.isOpen);
  }

}
