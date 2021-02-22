import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Otros módulos
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesRoutesModule } from './pages-routes.module';
import { RouterModule } from '@angular/router';

// Páginas
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { VentasComponent } from './ventas/ventas.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { AjustesComponent } from './ajustes/ajustes.component';

const paginas = [
  HomeComponent,
  VentasComponent,
  InventarioComponent,
  ClientesComponent,
  EstadisticasComponent,
  AjustesComponent,
];

@NgModule({
  declarations: [PagesComponent, ...paginas],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    PagesRoutesModule,
  ],
  exports: [...paginas],
})
export class PagesModule {}
