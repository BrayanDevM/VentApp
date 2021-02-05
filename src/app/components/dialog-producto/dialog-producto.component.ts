import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
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
    private fb: FormBuilder,
    private productos$: ProductosService
  ) {
    this.formProducto = this.fb.group({
      id: '',
      nombre: [null, Validators.required],
      precioCompra: [null, Validators.required],
      precioVenta: [null, Validators.required],
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
        .editarProducto(this.formProducto.value)
        .then(() => this.dialogRef.close());
    } else {
      this.productos$
        .guardarProducto(this.formProducto.value)
        .then(({ ok, producto }) => {
          this.productos$.productoNuevo$.emit(producto);
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
        this.productos$.eliminarProducto(producto.id);
        this.dialogRef.close();
      }
    });
  }
}
