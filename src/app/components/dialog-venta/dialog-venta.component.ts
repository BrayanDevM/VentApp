import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductosService } from 'src/app/services/productos.service';
import { Venta, VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-dialog-venta',
  templateUrl: './dialog-venta.component.html',
  styleUrls: ['./dialog-venta.component.css'],
})
export class DialogVentaComponent implements OnInit {
  formVenta: FormGroup;
  productos: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<DialogVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Venta,
    private fb: FormBuilder,
    private productos$: ProductosService,
    private ventas$: VentasService
  ) {
    this.formVenta = this.fb.group({
      id: '',
      producto: [null, Validators.required],
      cantidad: [1, Validators.required],
      cliente: [null, Validators.required],
      precio: [0],
      paga: [true],
      fecha: [new Date()],
    });
  }

  get fv() {
    return this.formVenta.value;
  }

  get fc() {
    return this.formVenta.controls;
  }

  ngOnInit(): void {
    this.compruebaEdicion();
    this.productos$.obtenerProductos().then((productos: any[]) => {
      this.productos = productos;
      // console.log(this.productos);
    });
  }

  /**
   * Comprueba si el dialog ha sido inyectado con una Venta
   * para tranformar el componente para edición
   */
  compruebaEdicion() {
    if (this.data) {
      console.log('viene venta para actualizar');
      this.formVenta.patchValue({
        id: this.data.id,
        producto: this.data.producto,
        cantidad: this.data.cantidad,
        cliente: this.data.cliente,
        precio: this.data.precio,
        paga: this.data.paga,
        fecha: this.data.fecha,
      });
    } else {
      console.log('no viene venta');
    }
  }

  guardarVenta() {
    if (this.formVenta.invalid) return;
    if (this.data) {
      console.log('es para actualizar');
      this.ventas$
        .editarVenta(this.formVenta.value)
        .then(() => this.dialogRef.close());
    } else {
      console.log('es nueva venta');
      this.ventas$.guardarVenta(this.formVenta.value).then((venta: Venta) => {
        this.ventas$.ventaNueva$.emit(venta);
        this.dialogRef.close();
      });
    }
  }

  obtenerPrecio() {
    const producto = this.fv.producto;
    let i = this.productos.findIndex((prod) => prod.nombre === producto);
    this.formVenta.patchValue({
      precio: this.productos[i].precio,
    });
  }
}
