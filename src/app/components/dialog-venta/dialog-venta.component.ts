import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AjustesService } from 'src/app/services/ajustes.service';
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

  fecha = new Date();
  hora = new Date().getHours();
  horaRecargoNoctInicio = 20;
  horaRecargoNoctFin = 6;

  constructor(
    private dialogRef: MatDialogRef<DialogVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Venta,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private productos$: ProductosService,
    private clientes$: ClientesService,
    private ventas$: VentasService,
    private ajustes$: AjustesService
  ) {
    this.formVenta = this.fb.group({
      id: '',
      producto: [null, Validators.required],
      precio: 0,
      recargoNocturno: 0,
      utilidad: 0,
      cantidad: [null, Validators.required],
      utilidadTotal: 0,
      cliente: [null, Validators.required],
      paga: [true],
      fecha: [this.fecha],
      totalVenta: null,
    });
    this.cargarAjustes();
  }

  get fv() {
    return this.formVenta.value;
  }

  get fc() {
    return this.formVenta.controls;
  }

  async ngOnInit() {
    Promise.all([
      this.productos$.obtenerProductos(),
      this.clientes$.obtenerClientes(),
    ]).then((data: any) => {
      this.productos = data[0];
      this.clientes = data[1];
      this.compruebaEdicion();
    });
  }

  cargarAjustes() {
    const ajustes = this.ajustes$.obtenerAjustes();
    this.horaRecargoNoctInicio = ajustes.horaRecargoNoctInicio;
    this.horaRecargoNoctFin = ajustes.horaRecargoNoctFin;
  }

  /**
   * Comprueba si el dialog ha sido inyectado con una Venta
   * para tranformar el componente para edición
   */
  compruebaEdicion() {
    if (this.data) {
      this.hora = new Date(this.data.fecha).getHours();

      // Validaciones para compatibilidad con ventas anteriores a inclusión de estas propiedades
      this.data.recargoNocturno = !this.data.recargoNocturno
        ? this.obtenerRecargoNoct(this.data.producto, this.hora)
        : this.data.recargoNocturno;
      const totalVenta =
        (this.data.precio + this.data.recargoNocturno) * this.data.cantidad;

      this.formVenta.patchValue({
        id: this.data.id,
        producto: this.data.producto,
        precio: this.data.precio,
        recargoNocturno: this.data.recargoNocturno,
        cantidad: this.data.cantidad,
        utilidad: this.data.utilidad,
        utilidadTotal: this.data.utilidadTotal,
        cliente: this.data.cliente,
        paga: this.data.paga,
        fecha: this.data.fecha,
        totalVenta: this.data.totalVenta || totalVenta,
      });
      this.obtenerStock();
    }
  }
  obtenerRecargoNoct(producto: string, horaVenta: number) {
    const i = this.productos.findIndex(
      (prod: Producto) => prod.nombre === producto
    );

    return horaVenta >= this.horaRecargoNoctInicio ||
      horaVenta < this.horaRecargoNoctFin
      ? this.productos[i].recargoNocturno
      : 0;
  }

  guardarVenta() {
    if (this.formVenta.invalid) return;
    if (this.data) {
      this.calcularUtilidadTotal();
      this.ventas$.editarVenta(this.fv).then(() => {
        this.ventas$.ventaEditada$.emit(this.fv);
        this.dialogRef.close();
      });
    } else {
      this.calcularUtilidadTotal();
      this.ventas$.guardarVenta(this.fv).then(({ ok, venta }) => {
        this.editarStockProducto(this.fv.producto, this.fv.cantidad);
        this.ventas$.ventaNueva$.emit(venta);
        this.dialogRef.close();
      });
    }
    console.log(this.fv);
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

  /**
   * Busca el producto seleccionado en la lista de productos
   * 1. Si la hora es mayor o igual a las 00 capturamos el valor
   * del recargo nocturno del producto, sino es 0.
   * 2. Editamos el formulario y el precio es = al precio + recargo.
   * 3. La utilidad es igual al precio de venta + recargo nocturno
   */
  obtenerValorProducto() {
    const producto = this.fv.producto;
    const i = this.productos.findIndex((prod) => prod.nombre === producto);
    const precioVenta = this.productos[i].precioVenta;
    const precioCompra = this.productos[i].precioCompra;

    const recargoNocturno =
      this.hora >= this.horaRecargoNoctInicio ||
      this.hora < this.horaRecargoNoctFin
        ? this.productos[i].recargoNocturno
        : 0;

    this.formVenta.patchValue({
      precio: precioVenta,
      recargoNocturno: recargoNocturno,
      utilidad: precioVenta + recargoNocturno - precioCompra,
    });
  }

  calcularUtilidadTotal() {
    const utilidadTotal = this.fv.utilidad * this.fv.cantidad;
    const totalVenta =
      (this.fv.precio + this.fv.recargoNocturno) * this.fv.cantidad;

    this.formVenta.patchValue({
      utilidadTotal: utilidadTotal,
      totalVenta: totalVenta,
    });
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
