import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import 'rxjs/add/operator/mergeMap';


import { ThingDetailsComponent } from './children/thing-details/thing-details.component';
import { ThingsService } from './things.service';
import { TagsService } from '../shared/tags.service';
import { ToastService } from '../shared/toast.service';

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
  private queryParams = { tags: [], searchText: '' };

  constructor(private dialog: MdDialog,
    private thingsService: ThingsService,
    private tagsService: TagsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService) {

    this.sub = this.route.queryParams.subscribe(queryParams => {
      this.queryParams.tags = queryParams['tags'] ? queryParams['tags'].split(',') : [];

      this.displayThings = this.queryParams.tags.length && this.things ?
        this.filterThingsByTags(this.queryParams.tags) : this.things;

      this.queryParams.searchText = queryParams['search'];

      if (this.queryParams.searchText) {
        this.displayThings = this.queryParams.searchText !== '' && this.displayThings ?
          this.filterThingsBySearch(this.queryParams.searchText) : this.displayThings;
      }
    });

  }

  ngOnInit() {
    this.tagsService.getAllTags()
      .flatMap(allTags => {
        this.allTags = allTags;
        return this.thingsService.getThings();
      })
      .subscribe((things) => {
        this.thingsService.thingsEvent.next(things);
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

  saveThing(aThing) {
    const isCreate = !aThing.id;
    aThing.text = aThing.text.replace(/\r?\n|\r/gm, ' ');
    const req = this.thingsService.saveThing(aThing);

    req.subscribe(
      (thingObject) => this.handleSaveCallback(isCreate, thingObject),
      (error: any) => {
        this.toastService.open('Thing could not be saved successfully', 'error-toaster');
      })
  }

  deleteThing(aThing) {
    this.thingsService.deleteThing(aThing.id)
      .subscribe(() => {
        this.things = this.things.filter((thing => thing.id !== aThing.id));
        this.toastService.open('Thing deleted successfully', 'success-toaster');
        this.updateDisplayThings();
      },
      (error: any) => {
        this.toastService.open('Thing could not be deleted successfully', 'error-toaster');
      });
  }

  addNewThing() {
    const newThing = this.thingsService.initializeThing();
    this.openThingDetailsDialog({ thing: newThing, isReadOnly: false });
  }

  openThingDetailsDialog(event) {
    let config: MdDialogConfig = {
      disableClose: !event.isReadOnly,
      width: '600px'
    }
    let dialogRef = this.dialog.open(ThingDetailsComponent, config);
    dialogRef.componentInstance.data = {
      thing: Object.assign({}, event.thing),
      allTags: this.allTags,
      isReadOnly: event.isReadOnly
    };
    dialogRef.afterClosed().subscribe(result => this.handleThingDialogClose(result));
  }

  getCols() {
    if (window.innerWidth < 600) {
      return 1;
    }
    else if (window.innerWidth < 960) {
      return 2;
    }
    else if (window.innerWidth < 1280) {
      return 3;
    }

    return 4;
  }

  private handleSaveCallback(isCreate, thingObject) {
    if (isCreate) {
      this.things = this.things.concat([thingObject]);
      this.toastService.open('Thing saved successfully', 'success-toaster');
    }
    else {
      this.things = this.things.map(thing => {
        if (thing.id === thingObject.id) {
          thing = Object.assign({}, thing, thingObject);
        }
        return thing;
      });
      this.toastService.open('Thing updated successfully', 'success-toaster');
    }
    this.updateTags(thingObject);
    this.updateDisplayThings();
  }

  updateTags(newThing) {
    newThing.tags.forEach(tag => {
      if (!this.allTags.find(aTag => tag.name === aTag.name)) {
        this.allTags.push(tag);
        this.tagsService.dynamicTagEvent.next(tag);
      }
    });
  }

  private handleThingDialogClose(result) {
    if (!result) {
      return;
    }
    switch (result.event) {
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

  private filterThingsByTags(tags) {
    const display = this.things.filter((thing) => {
      return thing.tags.some(tag => tags.indexOf(tag.id) !== -1);
    });
    // id 0 is for untagged things
    return tags.indexOf(0) !== -1 ?
      display.concat(this.things.filter((thing) => !thing.tags.length)) :
      display;
  }

  private filterThingsBySearch(searchTerm) {
    const text = searchTerm.toLowerCase();
    const display = this.displayThings.filter((thing) => {
      return thing.text.toLowerCase().indexOf(text) !== -1 ||
        (thing.source && thing.source.toLowerCase().indexOf(text) !== -1);
    });
    return display;
  }

  private updateDisplayThings() {
    this.displayThings = this.queryParams.tags.length ?
      this.filterThingsByTags(this.queryParams.tags) :
      this.things;

    if (this.queryParams.searchText) {
      this.displayThings = this.filterThingsBySearch(this.queryParams.searchText);
    }
  }

}
