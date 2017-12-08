import { SortByPipe } from './sort-by.pipe';

describe('SortByPipe', () => {

	let people = [{
		name: 'Callum',
		age: 20
	}, {
		name: 'Giles',
		age: 40
	}, {
		name: 'Luca',
		age: 33
	}, {
		name: 'Archie',
		age: 30
	}];

	it('create an instance', () => {
		const pipe = new SortByPipe();
		expect(pipe).toBeTruthy();
	});

	it('first object name should be \'Archie\' when we sort array by name', () => {
		const pipe = new SortByPipe();
		let sorted = pipe.transform(people, 'name');
		expect(sorted[0].name).toBe('Archie');
	});

	it('last object name should be \'Luca\' when sort array by name', () => {
		const pipe = new SortByPipe();
		let sorted = pipe.transform(people, 'name');
		expect(sorted[sorted.length - 1].name).toBe('Luca');
	});

	it('first object name should be \'Callum\' when we sort array by age', () => {
		const pipe = new SortByPipe();
		let sorted = pipe.transform(people, 'age');
		expect(sorted[0].name).toBe('Callum');
	});

	it('last object name should be \'Giles\' when we sort array by age', () => {
		const pipe = new SortByPipe();
		let sorted = pipe.transform(people, 'age');
		expect(sorted[sorted.length - 1].name).toBe('Giles');
	});

	it('should return undefined if input array is undefined', () => {
		const pipe = new SortByPipe();
		people = undefined;
		let sorted = pipe.transform(people, 'age');
		expect(sorted).toBeUndefined();
	});

	it('should return null if input array is null', () => {
		const pipe = new SortByPipe();
		people = null;
		let sorted = pipe.transform(people, 'age');
		expect(sorted).toBeNull();
	});
});
