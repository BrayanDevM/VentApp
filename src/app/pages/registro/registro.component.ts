import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { igualesValidator } from 'src/app/validators/iguales.validator';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  formReg: FormGroup;

  constructor(private fb: FormBuilder, private usuarios$: UsuariosService) {
    this.formReg = this.fb.group({
      nombre: [null, Validators.required],
      correo: [null, [Validators.required, Validators.email]],
      pass1: [null, [Validators.required, Validators.minLength(6)]],
      pass2: [null, [Validators.required, igualesValidator('pass1')]],
    });
  }

  get fv() {
    return this.formReg.value;
  }

  get fc() {
    return this.formReg.controls;
  }

  ngOnInit(): void {}

  registrarUsuario() {
    if (this.formReg.invalid) {
      console.warn('Formulario inválido');
      console.log(this.formReg);
    } else {
      console.log('Registrar usuario');
      this.usuarios$.registrarUsuario(this.fv);
    }
  }
}
