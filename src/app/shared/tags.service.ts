import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class TagsService {
    public dynamicTagEvent = new Subject();
    private baseUrl = `/api/tags`;
    private cachedTags;
    private allTagsObservable;

    constructor(private http: Http) { }

    getAllTags() {
        if (this.cachedTags) {
            return Observable.of(this.cachedTags);
        }
        if (this.allTagsObservable) {
            return this.allTagsObservable;
        }
        this.allTagsObservable = this.http.get(this.baseUrl)
            .share()
            .map(this.extractData)
            .do(tags => (this.cachedTags = tags))
            .catch(this.handleError);

        return this.allTagsObservable;
    }

    private extractData(response: Response) {
        let body = response.json();
        return body || [];
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }

}