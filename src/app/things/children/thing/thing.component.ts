import { 
	Component, 
	OnInit,
	Input
} from '@angular/core';

@Component({
  selector: 'memore-thing',
  templateUrl: './thing.component.html',
  styleUrls: ['./thing.component.scss']
})
export class ThingComponent implements OnInit {
  @Input() item; 
  canShowActions: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  truncateText(text, characters) {
    return text.length < characters ? text : `${text.substring(0, characters)} ...`;
  }

  showActions() {
    this.canShowActions = true;
  }

  hideActions() {
    this.canShowActions = false;
  }

}
