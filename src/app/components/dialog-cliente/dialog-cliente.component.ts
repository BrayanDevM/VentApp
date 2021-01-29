import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente, ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-dialog-cliente',
  templateUrl: './dialog-cliente.component.html',
  styleUrls: ['./dialog-cliente.component.css'],
})
export class DialogClienteComponent implements OnInit {
  formCliente: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DialogClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente,
    private fb: FormBuilder,
    private clientes$: ClientesService
  ) {
    this.formCliente = this.fb.group({
      id: '',
      nombre: [null, Validators.required],
      anotacion: '',
    });
  }

  get fv() {
    return this.formCliente.value;
  }

  get fc() {
    return this.formCliente.controls;
  }

  ngOnInit(): void {
    this.compruebaEdicion();
  }

  /**
   * Comprueba si el dialog ha sido inyectado con una Venta
   * para tranformar el componente para edición
   */
  compruebaEdicion() {
    if (this.data) {
      console.log('viene cliente para actualizar');
      this.formCliente.patchValue({
        id: this.data.id,
        nombre: this.data.nombre,
        anotacion: this.data.anotacion,
      });
    } else {
      console.log('no viene cliente');
    }
  }

  guardarCliente() {
    if (this.formCliente.invalid) return;
    if (this.data) {
      console.log('es para actualizar');
      this.clientes$
        .editarCliente(this.formCliente.value)
        .then(() => this.dialogRef.close());
    } else {
      console.log('es nueva venta');
      this.clientes$
        .guardarCliente(this.formCliente.value)
        .then((cliente: Cliente) => {
          this.clientes$.clienteNuevo$.emit(cliente);
          this.dialogRef.close();
        });
    }
  }
}
