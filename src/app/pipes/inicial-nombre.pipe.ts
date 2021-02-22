import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inicialNombre',
})
export class InicialNombrePipe implements PipeTransform {
  transform(nombre: string): string {
    return nombre.charAt(0);
  }
}
