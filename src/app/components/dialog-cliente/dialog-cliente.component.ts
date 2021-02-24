import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente, ClientesService } from 'src/app/services/clientes.service';
import { DialogConfirmaComponent } from '../dialog-confirma/dialog-confirma.component';

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
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
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
      this.formCliente.patchValue({
        id: this.data.id,
        nombre: this.data.nombre,
        anotacion: this.data.anotacion,
      });
    }
  }

  guardarCliente() {
    if (this.formCliente.invalid) return;
    if (this.data) {
      this.clientes$
        .guardarCliente(this.formCliente.value, this.data.id)
        .then(() => {
          this.crearNotificacion('Cliente actualizado correctamente');
          this.dialogRef.close();
        });
    } else {
      this.clientes$.guardarCliente(this.formCliente.value).then(() => {
        this.crearNotificacion('Cliente creado');
        this.dialogRef.close();
      });
    }
  }

  eliminarCliente(cliente: Cliente) {
    const dialog = this.dialog.open(DialogConfirmaComponent, {
      data: {
        texto: `Eliminar ${cliente.nombre}, esta acción no puede deshacerse.`,
      },
    });
    dialog.afterClosed().subscribe((confirma) => {
      if (confirma) {
        this.clientes$.eliminarCliente(cliente.id);
        this.dialogRef.close();
      }
    });
  }

  crearNotificacion(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      panelClass: 'notificacion',
    });
  }
}
