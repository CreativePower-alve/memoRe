import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isOpen: boolean = false;
  title = 'app works!';

  openMenu(isOpen) {
	  this.isOpen = isOpen;
  }
  onMenuClosed($event) {
	  this.isOpen = false;
  }
}
