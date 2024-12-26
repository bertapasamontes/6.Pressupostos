import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export class CustomValidators extends Validators {
  static onlyNumbers(numero: AbstractControl): ValidationErrors | null {
    return /^\d+$/.test(numero.value) ? null : { onlyNumbers: true };
  }
}
