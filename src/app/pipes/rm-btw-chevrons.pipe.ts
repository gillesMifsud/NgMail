import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rmBtwChevrons'
})
export class RmBtwChevronsPipe implements PipeTransform {

  transform(value: any): any {
    return value.replace(/<.*?>/g, '');
  }

}
