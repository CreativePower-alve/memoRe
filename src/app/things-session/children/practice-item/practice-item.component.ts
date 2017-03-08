import { Component, 
	 OnInit,
	 OnChanges,
	 Input,
	 Output,
	 EventEmitter,
	 ViewChild,
	 ViewChildren,
	 AfterViewInit } from '@angular/core';

@Component({
  selector: 'memore-practice-item',
  templateUrl: './practice-item.component.html',
  styleUrls: ['./practice-item.component.scss']
})
export class PracticeItemComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() item;
  @Output() onFinish = new EventEmitter();
 
  @ViewChild('userTextInput')
  userTextInput;
 
  @ViewChildren('letter')
  letters;
 
  chars: string[]
  currentIndex = 0;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(change) {
  	if(change.item && change.item.currentValue) {
      this.chars = this.item.text.split('');
  	}
  }

   ngAfterViewInit() {
    this.letters._results[this.currentIndex].nativeElement.focus();
  }


  handleUserInput(event) {
    event.preventDefault();
  	const userInput = event.key;
    const isValidChar = this.isValidChar(userInput, this.chars[this.currentIndex]);
    
    if (this.currentIndex < this.chars.length - 1 && isValidChar ) {
    	this.currentIndex ++;
    	this.letters._results[this.currentIndex].nativeElement.focus();
    	this.letters._results[this.currentIndex-1].nativeElement.innerText = '';
      this.letters._results[this.currentIndex-1].nativeElement.className = 'letter typed';
    }
    else if(this.currentIndex === this.chars.length -1 && isValidChar){
    	this.finishedItem();
    }
    else {
    	//handle user mismatch
      this.letters._results[this.currentIndex].nativeElement.className ='letter error'; 
      this.letters._results[this.currentIndex].nativeElement.innerText = '';
    }
  }

  private finishedItem() {
    this.onFinish.emit();
  }

  private isValidChar(userKey, expectedInput) {
  	return userKey === expectedInput;
  }



}
