import { AbstractControl, ValidatorFn } from '@angular/forms';

/** El campo actual debe tener el mismo valor que el campo a comparar */
export function igualesValidator(campoComparar: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const campoComparado = control.parent?.value[campoComparar];
    return campoComparado === control.value ? null : { iguales: false };
  };
}
