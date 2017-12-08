import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { PetListComponent } from './components/pet-list/pet-list.component';
import { PeopleService } from './services/people.service';
import { JsonService } from './services/json.service';
import { HttpModule } from '@angular/http';
import { SortByPipe } from './pipes/sort-by.pipe';
import { Observable } from 'rxjs';

describe('AppComponent', () => {
	let peopleService;

	const testPets = [
		{
			"name": "Garfield",
			"type": "Cat"
		},
		{
			"name": "Fido",
			"type": "Dog"
		}
	];

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpModule
			],
			declarations: [
				AppComponent,
				PetListComponent,
				SortByPipe
			],
			providers: [
				JsonService,
				PeopleService
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		peopleService = TestBed.get(PeopleService);
		spyOn(peopleService, 'getPetsForOwner').and.returnValue(Observable.of(testPets));
	});


	it('should create the app', async(() => {
		let fixture = TestBed.createComponent(AppComponent);
		let app = fixture.componentInstance;
		expect(app).toBeTruthy();
	}));

	it('maleOwnerPets should have two pets after calling loadMaleOwnerPets', async(() => {
		let fixture = TestBed.createComponent(AppComponent);
		let app = fixture.componentInstance;
		expect(app['maleOwnerPets']).toBeUndefined();
		app['loadMaleOwnerPets']();
		expect(app['maleOwnerPets'].length).toBe(2);
		expect(app['maleOwnerPets'].length).not.toBe(3)
	}));

	it('femaleOwnerPets should not have three pets after calling loadFemaleOwnerPets', async(() => {
		let fixture = TestBed.createComponent(AppComponent);
		let app = fixture.componentInstance;
		expect(app['femaleOwnerPets']).toBeUndefined();
		app['loadFemaleOwnerPets']();
		expect(app['femaleOwnerPets'].length).not.toBe(3);
		expect(app['femaleOwnerPets'].length).toBe(2);
	}));

	it('maleOwnerPets and femaleOwnerPets should have two pets after initialized', async(() => {
		let fixture = TestBed.createComponent(AppComponent);
		let app = fixture.componentInstance;
		expect(app['maleOwnerPets']).toBeUndefined();
		expect(app['femaleOwnerPets']).toBeUndefined();
		app.ngOnInit();
		expect(app['maleOwnerPets'].length).toBe(2);
		expect(app['femaleOwnerPets'].length).not.toBe(3)
	}));
});
