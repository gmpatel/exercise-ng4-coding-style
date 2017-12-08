import { Component, Input, OnInit } from '@angular/core';
import { Pet } from '../../services/people.service';

@Component({
	selector: 'pet-list',
	templateUrl: './pet-list.component.html',
	styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {

	@Input() pets: Pet[];
	@Input() owner: string;

	constructor() {
	}

	ngOnInit() {
	}

}
