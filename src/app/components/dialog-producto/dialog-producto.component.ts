import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto, ProductosService } from 'src/app/services/productos.service';

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
    private fb: FormBuilder,
    private productos$: ProductosService
  ) {
    this.formProducto = this.fb.group({
      id: '',
      nombre: [null, Validators.required],
      precioCompra: [null, Validators.required],
      precioVenta: [null, Validators.required],
      img: '',
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
      console.log('viene producto para actualizar');
      this.formProducto.patchValue({
        id: this.data.id,
        nombre: this.data.nombre,
        precioVenta: this.data.precioVenta,
        precioCompra: this.data.precioCompra,
        img: this.data.img,
      });
    } else {
      console.log('no viene producto');
    }
  }

  guardarProducto() {
    if (this.formProducto.invalid) return;
    if (this.data) {
      console.log('es para actualizar');
      this.productos$
        .editarProducto(this.formProducto.value)
        .then(() => this.dialogRef.close());
    } else {
      console.log('es nueva venta');
      this.productos$
        .guardarProducto(this.formProducto.value)
        .then((producto: Producto) => {
          this.productos$.productoNuevo$.emit(producto);
          this.dialogRef.close();
        });
    }
  }
}
