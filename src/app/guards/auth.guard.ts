import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {
  constructor(private usuarios$: UsuariosService, private router: Router) {}

  canActivateChild(): boolean {
    if (this.usuarios$.estaLogeado()) {
      // console.log('has iniciado sesión');
      return true;
    } else {
      console.warn('no has iniciado sesión');
      this.router.navigate(['/inicio']);
      return false;
    }
  }
}
