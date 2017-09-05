import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
  ViewChild,
  EventEmitter
} from '@angular/core';

import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';

import { TagsService } from '../shared/tags.service';
import { AuthTokenService } from '../shared/authToken.service';

@Component({
  selector: 'memore-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnChanges {
  @Input() isOpen: boolean;
  @ViewChild('sidenav') sidenav: MdSidenav;
  allTags;
  searchThings;
  noTag = { _id: 0, name: 'Untagged', checked: false };
  private filterBy: number[] = [];
  newTagSubscription;

  constructor(private tagsService: TagsService,
    private router: Router, private authService: AuthTokenService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      const selectedTags = localStorage.getItem('tags');
      this.filterBy = selectedTags ? selectedTags.split(',').map(Number) : [];
      this.tagsService.getAllTags().subscribe(allTags => {
        this.allTags = allTags.map(aTag => {
          aTag.checked = this.filterBy ?
            this.filterBy.indexOf(aTag._id) !== -1 :
            false;
          return aTag;
        });
      });
    }
    this.newTagSubscription = this.tagsService.dynamicTagEvent.subscribe((tag) => {
      this.allTags.push(tag);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      this.openSidenav();
    }
  }

  ngOnDestroy() {
    this.newTagSubscription.unsubscribe();
  }

  openSidenav() {
    this.sidenav.toggle();
  }

  addFilter(event, tag) {
    if (event.checked) {
      this.filterBy = this.filterBy.concat([tag._id]);
    }
    else {
      this.filterBy = this.filterBy.filter(tagId => tagId !== tag._id);
    }
    localStorage.setItem('tags', this.filterBy.join(','));
    this.router.navigate(['/things'], { queryParams: { tags: this.filterBy.join(',') } });
  }

  doThingsSearch() {
    this.router.navigate(['/things'], {
      queryParams: {
        tags: this.filterBy.join(','),
        search: this.searchThings
      }
    });
  }

}
