import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleano'
})
export class BooleanoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? "Sí" : "No";
  }

}
