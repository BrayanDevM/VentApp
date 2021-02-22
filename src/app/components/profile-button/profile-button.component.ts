import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.css'],
})
export class ProfileButtonComponent implements OnInit {
  usuarioImg: string;
  usuarioNombre: string;

  constructor(private usuarios$: UsuariosService) {
    this.usuarioNombre = this.usuarios$.usuario.nombre;
    this.usuarioImg = this.usuarios$.usuario.imagen;
  }

  ngOnInit(): void {}

  salir() {
    this.usuarios$.cerrarSesion();
  }
}
