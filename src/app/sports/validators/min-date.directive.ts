import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { formatDate } from "@angular/common";

@Directive({
  selector: '[appMinDate]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinDateDirective, multi: true}]
})
export class MinDateDirective implements Validator {

  appMinDate: string = "";

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    this.appMinDate = formatDate(new Date(), 'yyyy-MM-dd H:mm', 'en');
    this.appMinDate = this.appMinDate.replace(" ", "T");
    console.log(this.appMinDate, control.value);
    if (this.appMinDate && control.value && this.appMinDate > control.value) {
      return { minDate: true };
    }
      return null;
    }

}
