import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioComponent } from './inicio/inicio.component';
import { VentasComponent } from './ventas/ventas.component';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../material.module';

const paginas = [InicioComponent];

@NgModule({
  declarations: [...paginas, VentasComponent],
  imports: [CommonModule, MaterialModule, ComponentsModule],
  exports: [...paginas],
})
export class PagesModule {}
