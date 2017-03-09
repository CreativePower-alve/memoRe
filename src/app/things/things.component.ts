import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import 'rxjs/add/operator/mergeMap';

import {loginService} from '../account/login/login.service';
import { ThingDetailsComponent } from './children/thing-details/thing-details.component';
import { ThingsService } from './things.service';
import { TagsService } from '../shared/tags.service';

export enum EventType {
  SAVE,
  DELETE
};

@Component({
  selector: 'memore-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.scss']
})
export class ThingsComponent implements OnInit, OnDestroy {
  things;
  displayThings;
  private allTags;
  private sub: any;
  private queryParams = { tags: [], searchText: ''};
  constructor(private dialog: MdDialog,
   private thingsService: ThingsService,
   private tagsService: TagsService,
   private auth:loginService,
   private route: ActivatedRoute) { 
   
   this.sub = this.route.queryParams.subscribe(queryParams => {
       this.queryParams.tags = queryParams['tags'] ? queryParams['tags'].split(',').map(Number) : [];
      
       this.displayThings = this.queryParams.tags.length && this.things ? 
       this.filterThingsByTags(this.queryParams.tags) : this.things;
      
    });

  }

  ngOnInit() {
    this.auth.checkAuthenticationStatus();
    this.tagsService.getAllTags()
     .flatMap(allTags => {
       this.allTags = allTags;
       return this.thingsService.getThings();
      })
      .subscribe((things) => {
        this.things = things.map(thing => {
           thing.tags = thing.tags.map(tagId => this.allTags.find(tag => tag.id === tagId));
           return thing;
        });
        this.displayThings = this.queryParams.tags.length ? 
           this.filterThingsByTags(this.queryParams.tags) :
           this.things;
      });
  }

   ngOnDestroy() {
    this.sub.unsubscribe();
  }

  filterThingsByTags(tags) {
     const display = this.things.filter((thing) => {
         return thing.tags.some(tag => tags.indexOf(tag.id) !== -1);
     });
     return display ;
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
       allTags: this.allTags,
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
