import { Component, OnInit } from '@angular/core';
import { PeopleService, Person, Pet } from './services/people.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	private maleOwnerPets: Pet[];
	private femaleOwnerPets: Pet[];

	constructor(private peopleService: PeopleService) {
	}

	ngOnInit(): void {
		this.maleOwnerPets = [];
		this.femaleOwnerPets = [];

		this.loadMaleOwnerPets();
		this.loadFemaleOwnerPets();
	}

	private loadMaleOwnerPets() {
		this.peopleService.getPetsForOwner('male').subscribe(pets => {
			console.log('male owner\'s pets');
			console.log(pets);
			this.maleOwnerPets = pets;
		});
	}

	private loadFemaleOwnerPets() {
		this.peopleService.getPetsForOwner('female').subscribe(pets => {
			console.log('female owner\'s pets');
			console.log(pets);
			this.femaleOwnerPets = pets;
		});
	}
}
