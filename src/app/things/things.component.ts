import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';

import { ThingDetailsComponent } from './children/thing-details/thing-details.component';
import { ThingsService } from './things.service';

export enum EventType {
  SAVE,
  DELETE
};

@Component({
  selector: 'memore-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.scss']
})
export class ThingsComponent implements OnInit {
  public things;
  constructor(private dialog: MdDialog, private thingsService: ThingsService ) { 
   
  }

  ngOnInit() {
     this.thingsService.getThings()
      .subscribe((things) => this.things = things);
  }

  saveThing(aThing) {
    const isCreate = !aThing.id; 
    const req = this.thingsService.saveThing(aThing);
    
    req.subscribe(
          (thingObject) => this.handleSaveCallback(isCreate, thingObject),
          (error: any) => { }) //:todo show toast error
  }

  handleSaveCallback(isCreate, thingObject) {
    if (isCreate) {
       this.things = this.things.concat([thingObject])
     }
    else {
      this.things = this.things.map(thing => {
        if (thing.id === thingObject.id) {
          thing = Object.assign({}, thing, thingObject); 
        }
        return thing;
     });
    }
  }

  deleteThing(aThing) {
    this.thingsService.deleteThing(aThing)
       .subscribe(() => {
          this.things = this.things.filter((thing => thing.id !== aThing.id));
       }); 
  }

  addNewThing() {
    const newThing = this.thingsService.initializeThing();
    this.openThingDetailsDialog({thing: newThing, isReadOnly: false});
  }

  openThingDetailsDialog(event) {
    let config: MdDialogConfig = {
     disableClose: !event.isReadOnly,
     width: '500px'
    }
    let dialogRef = this.dialog.open(ThingDetailsComponent, config);
    dialogRef.componentInstance.data = {
       thing: Object.assign({}, event.thing),
       isReadOnly: event.isReadOnly
    };
    dialogRef.afterClosed().subscribe(result => this.handleThingDialogClose(result));
  }

  handleThingDialogClose(result) {
    if (!result) {
          return;
    }
    switch(result.event) {
      case EventType.SAVE:
         this.saveThing(result.thing);
         break;
      case EventType.DELETE:
         this.deleteThing(result.thing);
         break;
      default:
         '';      
    }
  }

}
