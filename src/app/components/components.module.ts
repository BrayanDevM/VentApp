import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

// componentes
import { NavegacionComponent } from './navegacion/navegacion.component';
import { ContadorComponent } from './contador/contador.component';
import { DialogVentaComponent } from './dialog-venta/dialog-venta.component';
import { ListaVentaComponent } from './lista-venta/lista-venta.component';
import { DialogConfirmaComponent } from './dialog-confirma/dialog-confirma.component';
import { DialogProductoComponent } from './dialog-producto/dialog-producto.component';
import { ListaProductoComponent } from './lista-producto/lista-producto.component';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';
import { DialogClienteComponent } from './dialog-cliente/dialog-cliente.component';
import { TabsVentasComponent } from './tabs-ventas/tabs-ventas.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { ChartBarComponent } from './chart-bar/chart-bar.component';
import { ChartDonutComponent } from './chart-donut/chart-donut.component';
import { RouterModule } from '@angular/router';
import { ProfileButtonComponent } from './profile-button/profile-button.component';

import { InicialNombrePipe } from '../pipes/inicial-nombre.pipe';

const componentes = [
  NavegacionComponent,
  ContadorComponent,
  DialogVentaComponent,
  ListaVentaComponent,
  DialogConfirmaComponent,
  DialogProductoComponent,
  ListaProductoComponent,
  ListaClienteComponent,
  DialogClienteComponent,
  TabsVentasComponent,
  ScrollTopComponent,
  ChartBarComponent,
  ChartDonutComponent,
  ProfileButtonComponent,
];

@NgModule({
  declarations: [...componentes, InicialNombrePipe],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
  ],
  exports: [...componentes, InicialNombrePipe],
})
export class ComponentsModule {}
