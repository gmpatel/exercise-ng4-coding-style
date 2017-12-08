import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PeopleService } from './services/people.service';
import { JsonService } from './services/json.service';
import { PetListComponent } from './components/pet-list/pet-list.component';
import { SortByPipe } from './pipes/sort-by.pipe';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
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
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
}
