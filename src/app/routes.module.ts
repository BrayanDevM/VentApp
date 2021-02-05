import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Páginas
import { InicioComponent } from './pages/inicio/inicio.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { AjustesComponent } from './pages/ajustes/ajustes.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';

const rutas: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'ajustes', component: AjustesComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule],
})
export class RoutesModule {}
