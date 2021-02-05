import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Cliente, ClientesService } from 'src/app/services/clientes.service';
import { Producto, ProductosService } from 'src/app/services/productos.service';
import { Venta, VentasService } from 'src/app/services/ventas.service';
import { DialogConfirmaComponent } from '../dialog-confirma/dialog-confirma.component';

@Component({
  selector: 'app-dialog-venta',
  templateUrl: './dialog-venta.component.html',
  styleUrls: ['./dialog-venta.component.css'],
})
export class DialogVentaComponent implements OnInit {
  formVenta: FormGroup;
  productos: Producto[] = [];
  clientes: Cliente[] = [];
  stockProducto = 0;

  constructor(
    private dialogRef: MatDialogRef<DialogVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Venta,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private productos$: ProductosService,
    private clientes$: ClientesService,
    private ventas$: VentasService
  ) {
    this.formVenta = this.fb.group({
      id: '',
      producto: [null, Validators.required],
      utilidad: 0,
      cantidad: [null, Validators.required],
      utilidadTotal: 0,
      cliente: [null, Validators.required],
      precio: 0,
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

  async ngOnInit() {
    this.productos = await this.productos$.obtenerProductos();
    this.clientes = await this.clientes$.obtenerClientes();
    this.compruebaEdicion();
  }

  /**
   * Comprueba si el dialog ha sido inyectado con una Venta
   * para tranformar el componente para edición
   */
  compruebaEdicion() {
    if (this.data) {
      this.formVenta.patchValue({
        id: this.data.id,
        producto: this.data.producto,
        cantidad: this.data.cantidad,
        utilidad: this.data.utilidad,
        utilidadTotal: this.data.utilidadTotal,
        cliente: this.data.cliente,
        precio: this.data.precio,
        paga: this.data.paga,
        fecha: this.data.fecha,
      });
      this.obtenerStock();
    }
  }

  guardarVenta() {
    if (this.formVenta.invalid) return;
    if (this.data) {
      this.calcularUtilidadTotal();
      this.ventas$.editarVenta(this.formVenta.value).then(() => {
        this.ventas$.ventaEditada$.emit(this.formVenta.value);
        this.dialogRef.close();
      });
    } else {
      this.calcularUtilidadTotal();
      this.ventas$.guardarVenta(this.formVenta.value).then(({ ok, venta }) => {
        this.editarStockProducto(this.fv.producto, this.fv.cantidad);
        this.ventas$.ventaNueva$.emit(venta);
        this.dialogRef.close();
      });
    }
  }

  eliminarVenta(venta: Venta) {
    const dialog = this.dialog.open(DialogConfirmaComponent, {
      data: {
        texto: `Eliminar venta de ${venta.cliente}, esta acción no puede deshacerse.`,
      },
    });
    dialog.afterClosed().subscribe((confirma) => {
      if (confirma) {
        this.ventas$.eliminarVenta(venta.id);
        this.dialogRef.close();
        this.ventas$.ventaEliminada$.emit(venta.id);
      }
    });
  }

  obtenerValorProducto() {
    const producto = this.fv.producto;
    const i = this.productos.findIndex((prod) => prod.nombre === producto);
    this.formVenta.patchValue({
      precio: this.productos[i].precioVenta,
      utilidad: this.productos[i].precioVenta - this.productos[i].precioCompra,
    });
  }

  calcularUtilidadTotal() {
    const producto = this.fv.producto;
    const i = this.productos.findIndex((prod) => prod.nombre === producto);
    this.formVenta.patchValue({
      utilidadTotal: this.fv.utilidad * this.fv.cantidad,
    });
    // console.log('utilidad: ', this.fv.utilidad);
    // console.log('cant. vendida: ', this.fv.cantidad);
    // console.log('utilidad total: ', this.fv.utilidadTotal);
  }

  obtenerStock() {
    const producto = this.fv.producto;
    const i = this.productos.findIndex((prod) => prod.nombre === producto);
    this.stockProducto = this.productos[i].stock;
  }

  editarStockProducto(nombreProducto: string, cantVendida: number) {
    const i = this.productos.findIndex(
      (prod) => prod.nombre === nombreProducto
    );
    const producto = this.productos[i];
    producto.stock += -cantVendida;
    this.productos$.editarProducto(producto);
  }
}
