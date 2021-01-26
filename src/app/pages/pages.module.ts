import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioComponent } from './inicio/inicio.component';
import { VentasComponent } from './ventas/ventas.component';

const paginas = [InicioComponent];

@NgModule({
  declarations: [...paginas, VentasComponent],
  imports: [CommonModule],
  exports: [...paginas],
})
export class PagesModule {}
