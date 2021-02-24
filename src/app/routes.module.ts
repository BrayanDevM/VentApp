import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { InicioComponent } from './pages/inicio/inicio.component';

// Páginas
import { LoginComponent } from './pages/login/login.component';
import { PagesComponent } from './pages/pages.component';
import { RegistroComponent } from './pages/registro/registro.component';

const rutas: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    component: PagesComponent,
    canActivateChild: [AuthGuard],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule],
})
export class RoutesModule {}
