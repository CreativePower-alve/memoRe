import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  ViewChild,
  EventEmitter
} from '@angular/core';

import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';

import { TagsService } from '../shared/tags.service';
import { AuthTokenService } from '../shared/authToken.service';
import { ToastService } from "../shared/toast.service";

@Component({
  selector: 'memore-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() isOpen: boolean;
  @Input() isLoggedIn: boolean;
  @ViewChild('sidenav') sidenav: MdSidenav;
  allTags = [];
  searchThings;
  noTag = { _id: 0, name: 'Untagged', checked: false };
  private filterBy = [];
  newTagSubscription;

  constructor(
    private tagsService: TagsService,
    private router: Router,
    private authService: AuthTokenService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.newTagSubscription = this.tagsService.dynamicTagEvent.subscribe(({ tag, action }) => {
      if ('add' === action) {
        this.allTags = this.allTags.concat([tag]);
      }
    });
  }

  ngOnChanges(change) {
    if (change['isLoggedIn'] && change['isLoggedIn'].currentValue) {
      this.initializeTags();
    }
  }

  ngOnDestroy() {
    this.newTagSubscription.unsubscribe();
  }

  openSidenav() {
    this.sidenav.toggle();
  }

  initializeTags() {
    const selectedTags = sessionStorage.getItem('tags');
    this.filterBy = selectedTags ? selectedTags.split(',') : [];
    this.tagsService.getAllTags().subscribe(allTags => {
      this.allTags = allTags.map(aTag => {
        aTag.checked = this.filterBy ?
          this.filterBy.indexOf(aTag.id) !== -1 :
          false;
        return aTag;
      });
    });
  }

  addFilter(event, tag) {
    if (event.checked) {
      this.filterBy = this.filterBy.concat([tag.id]);
    }
    else {
      this.filterBy = this.filterBy.filter(tagId => tagId && tagId !== tag.id);
    }
    sessionStorage.setItem('tags', this.filterBy.join(','));
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

  deleteTag(tagId) {
    this.tagsService.deleteTag(tagId).subscribe(() => {
      this.tagsService.dynamicTagEvent.next({ tag: { id: tagId }, action: 'delete' });
      this.allTags = this.allTags.filter(aTag => aTag.id !== tagId);
      this.toastService.open('Tag deleted successfully', 'success-toaster');
    });
  }

}
