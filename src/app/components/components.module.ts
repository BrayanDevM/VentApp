import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavegacionComponent } from './navegacion/navegacion.component';
import { ContadorComponent } from './contador/contador.component';
import { DialogVentaComponent } from './dialog-venta/dialog-venta.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaVentaComponent } from './lista-venta/lista-venta.component';

const componentes = [
  NavegacionComponent,
  ContadorComponent,
  DialogVentaComponent,
  ListaVentaComponent,
];

@NgModule({
  declarations: [...componentes],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [...componentes],
})
export class ComponentsModule {}
