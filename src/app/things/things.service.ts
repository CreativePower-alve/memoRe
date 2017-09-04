import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class ThingsService {
    private baseUrl = `/api/things`;

    constructor(private http: Http) {}

     getThings() {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteThing(id: number): Observable<Response> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url)
            .catch(this.handleError);
    }

    saveThing(thing) {
        if (thing.id === 0) {
            return this.createThing(thing);
        }
        return this.updateThing(thing);
    }

    private createThing(thing) {
        thing.id = undefined;
        return this.http.post(this.baseUrl, thing)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private updateThing(thing) {
        const url = `${this.baseUrl}/${thing.id}`;
        return this.http.put(url, thing)
            .map(() => thing)
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body || [];
    }

    private handleError(error: Response) {
        return Observable.throw(error || 'Server error');
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
