import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(private fb: FormBuilder, private usuarios$: UsuariosService) {
    this.formLogin = this.fb.group({
      correo: ['admin@ventapp.com', [Validators.required, Validators.email]],
      pass: ['123456', Validators.required],
    });
  }

  ngOnInit(): void {}

  get fv() {
    return this.formLogin.value;
  }

  iniciarSesionCorreo() {
    if (this.formLogin.invalid) {
      console.warn('Formulario inválido');
      console.log(this.formLogin);
      return;
    }
    this.usuarios$.loginC(this.fv.correo, this.fv.pass);
  }

  iniciarSesionGoogle() {
    this.usuarios$.loginG();
  }
  iniciarSesionFb() {
    this.usuarios$.loginF();
  }

  cerrarSesion() {
    this.usuarios$.cerrarSesion();
  }
}
