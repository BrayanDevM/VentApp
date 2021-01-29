import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavegacionComponent } from './navegacion/navegacion.component';
import { ContadorComponent } from './contador/contador.component';
import { DialogVentaComponent } from './dialog-venta/dialog-venta.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaVentaComponent } from './lista-venta/lista-venta.component';
import { DialogConfirmaComponent } from './dialog-confirma/dialog-confirma.component';
import { DialogProductoComponent } from './dialog-producto/dialog-producto.component';
import { ListaProductoComponent } from './lista-producto/lista-producto.component';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';
import { DialogClienteComponent } from './dialog-cliente/dialog-cliente.component';

const componentes = [
  NavegacionComponent,
  ContadorComponent,
  DialogVentaComponent,
  ListaVentaComponent,
  DialogConfirmaComponent,
  DialogProductoComponent,
  ListaProductoComponent,
  ListaClienteComponent,
];

@NgModule({
  declarations: [...componentes, DialogClienteComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [...componentes],
})
export class ComponentsModule {}
