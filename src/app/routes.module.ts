import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';

// Páginas
import { InicioComponent } from './pages/inicio/inicio.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { VentasComponent } from './pages/ventas/ventas.component';

const rutas: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule],
})
export class RoutesModule {}
