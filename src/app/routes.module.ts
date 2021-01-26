import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Páginas
import { InicioComponent } from './pages/inicio/inicio.component';
import { VentasComponent } from './pages/ventas/ventas.component';

const rutas: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'ventas', component: VentasComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule],
})
export class RoutesModule {}
