import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class TagsService{
    private baseUrl = `/api/tags`;
    public dynamicTagEvent = new Subject();

    constructor(private http: Http) {}

     getAllTags() {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
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