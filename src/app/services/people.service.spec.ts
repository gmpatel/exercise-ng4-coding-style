import { TestBed, inject } from '@angular/core/testing';
import { PeopleService, Person } from './people.service';
import { JsonService } from './json.service';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs';

describe('PeopleService', () => {

	let jsonService;

	const mockData = [
		{
			"name": "Bob",
			"gender": "Male",
			"age": 23,
			"pets": [
				{
					"name": "Garfield",
					"type": "Cat"
				},
				{
					"name": "Fido",
					"type": "Dog"
				}
			]
		},
		{
			"name": "Fred",
			"gender": "Female",
			"age": 40,
			"pets": [
				{
					"name": "Tom",
					"type": "Cat"
				},
				{
					"name": "Max",
					"type": "Cat"
				},
				{
					"name": "Sam",
					"type": "Dog"
				},
				{
					"name": "Jim",
					"type": "Cat"
				}
			]
		}
	];

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [
				JsonService,
				PeopleService
			]
		});

		jsonService = TestBed.get(JsonService);
		spyOn(jsonService, 'loadJson').and.returnValue(Observable.of(mockData));

	});

	it('should create an instance of people service', inject([PeopleService], (service: PeopleService) => {
		expect(service).toBeTruthy();
	}));

	it('should return true when call test method', inject([PeopleService], (service: PeopleService) => {
		service.testMethod().subscribe((result) => {
			expect(result).toBe(true);
		});
	}));

	it('should called load json when calling it for first time', (done) => {
		inject([PeopleService], (service: PeopleService) => {
			service.getPetsForOwner('male').subscribe(() => {
				expect(jsonService.loadJson).toHaveBeenCalled();
				done();
			});
		})();
	});

	it('should not called load json when calling it for second time', (done) => {
		inject([PeopleService], (service: PeopleService) => {
			service.getPetsForOwner('female').subscribe(() => {
				expect(jsonService.loadJson.calls.count()).toBe(1);
				done();
			});
		})();
	});

	it('should return total of 2 pets for male owner', (done) => {
		inject([PeopleService], (service: PeopleService) => {
			service.getPetsForOwner('male').subscribe((result) => {
				expect(result.length).toBe(2);
				done();
			});
		})();
	});
});
