import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductosService } from 'src/app/services/productos.service';
import { VentasService } from 'src/app/services/ventas.service';

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
    private fb: FormBuilder,
    private productos$: ProductosService,
    private ventas$: VentasService
  ) {
    this.formVenta = this.fb.group({
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
    this.productos$.obtenerProductos().then((productos: any[]) => {
      this.productos = productos;
      // console.log(this.productos);
    });
  }

  guardarVenta() {
    if (this.formVenta.invalid) return;
    this.ventas$.guardarVenta(this.formVenta.value).then(() => {
      console.log('Venta guardada');
      this.ventas$.ventaNueva$.emit(this.formVenta.value);
      this.dialogRef.close();
    });
  }

  obtenerPrecio() {
    const producto = this.fv.producto;
    let i = this.productos.findIndex((prod) => prod.nombre === producto);
    this.formVenta.patchValue({
      precio: this.productos[i].precio,
    });
  }
}
