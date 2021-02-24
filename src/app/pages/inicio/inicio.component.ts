import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  constructor(private usuarios$: UsuariosService, private router: Router) {
    if (this.usuarios$.estaLogeado()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {}
}
