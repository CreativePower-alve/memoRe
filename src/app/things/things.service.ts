import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class ThingsService {
    private baseUrl = 'api/things';

    constructor(private http: Http) {}

     getThings() {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteThing(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .catch(this.handleError);
    }

    saveThing(thing) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (thing.id === 0) {
            return this.createThing(thing, options);
        }
        return this.updateThing(thing, options);
    }

    private createThing(thing, options: RequestOptions) {
        thing.id = undefined;
        return this.http.post(this.baseUrl, thing, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private updateThing(thing, options: RequestOptions) {
        const url = `${this.baseUrl}/${thing.id}`;
        return this.http.put(url, thing, options)
            .map(() => thing)
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    initializeThing() {
        // Return an initialized object
        return {
            id: 0,
            text: '',
            source: '',
            tags: []
        };
    }

}
