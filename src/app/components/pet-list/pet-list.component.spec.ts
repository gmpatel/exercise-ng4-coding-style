import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PetListComponent } from './pet-list.component';
import { SortByPipe } from '../../pipes/sort-by.pipe';

describe('PetListComponent', () => {

	let component: PetListComponent;
	let fixture: ComponentFixture<PetListComponent>;
	let expectedOwner: string;

	const testPets = [
		{
			"name": "Garfield",
			"type": "Cat"
		},
		{
			"name": "Fido",
			"type": "Dog"
		},
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
		}
	];

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				PetListComponent,
				SortByPipe
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PetListComponent);
		component = fixture.componentInstance;
		expectedOwner = 'Male';
		component.owner = expectedOwner;
		fixture.detectChanges();
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	it('should contain Male on title', () => {
		let titleEl = fixture.debugElement.query(By.css('.title'));
		expect(titleEl.nativeElement.textContent).toContain(expectedOwner);
	});

	it('should display Male Owner as title', () => {
		let titleEl = fixture.debugElement.query(By.css('.title'));
		expect(titleEl.nativeElement.textContent).toEqual(expectedOwner + ' Owner');
	});

	it('should return old title before without change detection', () => {
		let titleEl = fixture.debugElement.query(By.css('.title'));
		let oldOwnerTitle = titleEl.nativeElement.textContent;
		expectedOwner = 'Female';
		component.owner = expectedOwner;
		expect(titleEl.nativeElement.textContent).toEqual(oldOwnerTitle);
	});

	it('should updated title after change detection ', () => {
		let titleEl = fixture.debugElement.query(By.css('.title'));
		expectedOwner = 'Female';
		component.owner = expectedOwner;
		fixture.detectChanges();
		expect(titleEl.nativeElement.textContent).toContain(expectedOwner);
	});

	it('should have no pet element on list', () => {
		let pets = fixture.debugElement.queryAll(By.css('.pet'));
		expect(pets.length).toEqual(0);
	});

	it('should have first pet name as \'Fido\'', () => {
		component.pets = testPets;
		fixture.detectChanges();
		let pets = fixture.debugElement.queryAll(By.css('.pet'));
		expect(pets[0].nativeElement.textContent).toEqual('Fido');
	});
});
