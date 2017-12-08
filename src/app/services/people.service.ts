import { Injectable } from '@angular/core';
import { JsonService } from './json.service';
import { Observable } from 'rxjs/Rx';

export interface Person {
	name: string;
	gender: string;
	age: number;
	pets: Pet[];
}

export interface Pet {
	name: string;
	type: string;
}


@Injectable()
export class PeopleService {
	private webServiceUrl = 'http://agl-developer-test.azurewebsites.net/people.json';

	private people: Person[];

	constructor(private jsonService: JsonService) {
		this.webServiceUrl = '/assets/data/people.json';
	}

	public getPetsForOwner(type: string): Observable<Pet[]> {
		return Observable.create(observer => {
			if (!this.people) {
				this.jsonService.loadJson(this.webServiceUrl).subscribe((people: Person[]) => {
					this.people = people;
					observer.next(this.getPetsForOwnerType(type));
					observer.complete();
				})
			} else {
				observer.next(this.getPetsForOwnerType(type));
				observer.complete();
			}
		});
	}

	private getPetsForOwnerType(ownerType: string): Pet[] {
		let pets: Pet[] = [];
		const owners = this.people.filter(p => p.gender.toLowerCase() === ownerType.toLowerCase());
		owners.forEach(o => {
			if (o.pets) {
				pets = pets.concat(o.pets);
			}
		});
		return pets;
	}

	public testMethod(): Observable<boolean> {
		return Observable.of(true);
	}

	// TODO: Reset People array to null, when add or updated people so it will get reloaded when next call will happen
}
