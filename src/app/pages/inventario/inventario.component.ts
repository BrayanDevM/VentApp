import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogProductoComponent } from 'src/app/components/dialog-producto/dialog-producto.component';
import { Producto, ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
})
export class InventarioComponent implements OnInit {
  productosLista: Producto[] = [];

  constructor(public dialog: MatDialog, private productos$: ProductosService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  async obtenerProductos() {
    this.productosLista = await this.productos$.obtenerProductos();
  }

  nuevoProducto() {
    this.dialog.open(DialogProductoComponent);
  }

  editarProducto(producto: Producto) {
    this.dialog.open(DialogProductoComponent, {
      data: producto,
    });
  }
}
