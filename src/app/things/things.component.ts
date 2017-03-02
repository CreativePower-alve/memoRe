import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'memore-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.scss']
})
export class ThingsComponent implements OnInit {
  public things: any[];
  constructor() { 
    this.things = [
    {name: 'firstQuote'},
    {name: 'secondQuote'}
    ];
  }

  ngOnInit() {
  }

}
