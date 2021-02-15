import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from 'src/app/services/productos.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css'],
})
export class ListaProductoComponent implements OnInit {
  @Input() producto: Producto = {
    id: '0',
    nombre: 'Producto',
    precioVenta: 0,
    precioCompra: 0,
    recargoNocturno: 0,
    img: '',
    stock: 0,
  };

  @Output() eliminarProducto$ = new EventEmitter<Producto>();
  @Output() editarProducto$ = new EventEmitter<Producto>();

  constructor() {}

  ngOnInit(): void {}

  editarProducto(producto: Producto) {
    this.editarProducto$.emit(producto);
  }

  eliminarProducto(producto: Producto) {
    this.eliminarProducto$.emit(producto);
  }
}
