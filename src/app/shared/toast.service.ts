import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Injectable } from '@angular/core';
@Injectable()
export class ToastService{

constructor(private snackBar: MdSnackBar){}

	open(message: string, 
		 autoHide : number = 3000,
		 extraClass: string[] = ['toast-top-right'],
		 action: boolean = false,
		 actionButtonLabel: string = '') {
	
		    let config = new MdSnackBarConfig();
		    config.duration = autoHide;
		    config.extraClasses = extraClass;
		    this.snackBar.open(message, action && actionButtonLabel, config);
  }
}