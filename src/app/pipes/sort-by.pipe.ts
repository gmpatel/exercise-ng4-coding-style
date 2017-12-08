import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
	transform(array: Array<any>, property: string): Array<any> {
		if (array) {
			array.sort((a: any, b: any) => {
				if ( a[property] < b[property] ) {
					return -1;
				} else if ( a[property] > b[property] ) {
					return 1;
				} else {
					return 0;
				}
			});
			return array;
		}
		return array;
	}
}
