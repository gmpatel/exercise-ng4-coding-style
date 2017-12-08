import { TestBed, inject } from '@angular/core/testing';
import { JsonService } from './json.service';
import { HttpModule, Response, XHRBackend, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('JsonService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpModule
			],
			providers: [
				JsonService,
				{
					provide: XHRBackend,
					useClass: MockBackend
				}
			]
		});
	});

	it('should create an instance of JsonService',
		inject([JsonService], (service: JsonService) => {

		expect(service).toBeTruthy();
	}));

	it('load json should return observable of json object',
		inject([JsonService, XHRBackend], (service: JsonService, mockBackend: MockBackend) => {

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
				"gender": "Male",
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

		mockBackend.connections.subscribe((connection) => {
			connection.mockRespond(new Response(new ResponseOptions({
				body: JSON.stringify(mockData)
			})));
		});

		let url = "http://mock-url";

		service.loadJson(url).subscribe((data) => {
			expect(data).not.toBeNull();
			expect(data.length).toBe(2);
			expect(data[1].pets[2].name).toEqual('Sam');
		});
	}));
});
