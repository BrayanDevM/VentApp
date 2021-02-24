import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Páginas
import { HomeComponent } from './home/home.component';
import { VentasComponent } from './ventas/ventas.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ClientesComponent } from './clientes/clientes.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

const rutas: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'ajustes', component: AjustesComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule],
})
export class PagesRoutesModule {}
