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
   	console.log('after view init');
    this.letters._results[this.currentIndex].nativeElement.focus();
  }

  finishedItem() {
  	this.onFinish.emit();
  }

  handleUserInput(event) {
  	const userInput = event.key;
  	const specialChar = event.key === 'Dead' ? this.getSpecialCharacter(event.keyCode) : false;
    const keyCode = event.keyCode;
    const isValidChar = this.isValidChar(userInput, specialChar, this.chars[this.currentIndex]);
    
    if (this.currentIndex < this.chars.length - 1 && isValidChar ) {
    	this.currentIndex ++;
    	this.letters._results[this.currentIndex].nativeElement.focus();
    	this.letters._results[this.currentIndex-1].nativeElement.innerText = '';
    console.log(userInput, 'true');
    }
    else if(this.currentIndex === this.chars.length -1 && isValidChar){
    	this.finishedItem();
    	this.currentIndex = 0;
    	this.clearLetters();
    }
    else {
    	//handle user mismatch
    	console.log(userInput, 'false', 'expected', this.chars[this.currentIndex]);
    }
  }

  getSpecialCharacter(key) {
  	switch(key) {
  		case 222: 
  		  return "\'";
  	}
  }

  isValidChar(userKey, specialChar, expectedInput) {
  	return specialChar ? specialChar === expectedInput : userKey === expectedInput;
  }

  clearLetters() {
  	this.letters.forEach(letter => {
  		letter.nativeElement.innerHTML = '';
  	})
  }

}
