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
  constructor() { }

  ngOnInit() {
  }

}
