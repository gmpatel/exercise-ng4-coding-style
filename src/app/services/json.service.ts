import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class JsonService {

	constructor(private http: Http) {
	}

	public loadJson(jsonUrl: string): Observable<any> {
		return this.http.request(jsonUrl).map(res => res.json());
	}

}
