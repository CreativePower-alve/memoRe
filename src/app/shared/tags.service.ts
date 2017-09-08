import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { LoginService } from "../account/login/login.service";

@Injectable()
export class TagsService {
    public dynamicTagEvent = new Subject();
    public logoutSubscription;
    private baseUrl = `/api/tags`;
    private cachedTags;
    private allTagsObservable;

    constructor(private http: Http, loginService: LoginService) {
        this.logoutSubscription = loginService.logoutEvent.subscribe(() => {
            this.invalidateCache();
        });
    }

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

    deleteTag(tagId) {
        return this.http.delete(`${this.baseUrl}/${tagId}`)
            .catch(this.handleError);
    }

    invalidateCache() {
        this.cachedTags = undefined;
        this.allTagsObservable = null;
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