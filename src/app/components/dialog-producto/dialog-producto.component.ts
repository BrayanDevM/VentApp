import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto, ProductosService } from 'src/app/services/productos.service';
import { DialogConfirmaComponent } from '../dialog-confirma/dialog-confirma.component';

@Component({
  selector: 'app-dialog-producto',
  templateUrl: './dialog-producto.component.html',
  styleUrls: ['./dialog-producto.component.css'],
})
export class DialogProductoComponent implements OnInit {
  formProducto: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DialogProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private productos$: ProductosService
  ) {
    this.formProducto = this.fb.group({
      id: '',
      nombre: [null, Validators.required],
      precioCompra: [null, Validators.required],
      precioVenta: [null, Validators.required],
      recargoNocturno: [0],
      img: '',
      stock: [null, Validators.required],
    });
  }

  get fv() {
    return this.formProducto.value;
  }

  get fc() {
    return this.formProducto.controls;
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
      this.formProducto.patchValue({
        id: this.data.id,
        nombre: this.data.nombre,
        precioVenta: this.data.precioVenta,
        precioCompra: this.data.precioCompra,
        recargoNocturno: this.data.recargoNocturno,
        img: this.data.img,
        stock: this.data.stock,
      });
    }
  }

  sumarStock(cantidad: number) {
    this.formProducto.patchValue({
      stock: this.fv.stock + cantidad,
    });
  }

  guardarProducto() {
    if (this.formProducto.invalid) return;
    if (this.data) {
      this.productos$
        .guardarProducto(this.formProducto.value, this.data.id)
        .then(() => {
          this.crearNotificacion('Producto actualizado');
          this.dialogRef.close();
        });
    } else {
      this.productos$
        .guardarProducto(this.formProducto.value)
        .then((result) => {
          console.log(result);
          this.crearNotificacion('Producto creado');
          this.dialogRef.close();
        });
    }
  }

  eliminarProducto(producto: Producto) {
    const dialog = this.dialog.open(DialogConfirmaComponent, {
      data: {
        texto: `Eliminar ${producto.nombre}, esta acción no puede deshacerse.`,
      },
    });
    dialog.afterClosed().subscribe((confirma) => {
      if (confirma) {
        this.productos$.eliminarProducto(producto.id).then(() => {
          this.crearNotificacion('Producto eliminado');
        });
        this.dialogRef.close();
      }
    });
  }

  crearNotificacion(mensaje: string) {
    this._snackBar.open(mensaje, undefined, {
      duration: 2000,
    });
  }
}
