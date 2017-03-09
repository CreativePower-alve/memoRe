import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Injectable } from '@angular/core';
@Injectable()
export class ToastService{

constructor(private snackBar: MdSnackBar){}

    private defaultClass: string[] = ['toast-top-right'];

	open(message: string, 
		 extraClass: string,
		 autoHide : number = 3000,
		 action: boolean = false,
		 actionButtonLabel: string = '') {
	        const classes: string[] = this.defaultClass.slice(0); 
		    let config = new MdSnackBarConfig();
		    config.duration = autoHide;
		    config.extraClasses = extraClass ? classes.concat([extraClass]) : classes;
		    this.snackBar.open(message, action && actionButtonLabel, config);
  }
}