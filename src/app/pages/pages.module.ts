import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Otros módulos
import { RoutesModule } from '../routes.module';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../material.module';

// Páginas
import { InicioComponent } from './inicio/inicio.component';
import { VentasComponent } from './ventas/ventas.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { AjustesComponent } from './ajustes/ajustes.component';

const paginas = [
  InicioComponent,
  VentasComponent,
  InventarioComponent,
  ClientesComponent,
  EstadisticasComponent,
  AjustesComponent,
];

@NgModule({
  declarations: [...paginas],
  imports: [CommonModule, RoutesModule, MaterialModule, ComponentsModule],
  exports: [...paginas],
})
export class PagesModule {}
