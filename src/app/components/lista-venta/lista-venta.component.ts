import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Venta } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-lista-venta',
  templateUrl: './lista-venta.component.html',
  styleUrls: ['./lista-venta.component.css'],
})
export class ListaVentaComponent implements OnInit {
  @Input() venta: Venta = {
    id: '0',
    producto: 'Producto',
    precio: 0,
    cantidad: 0,
    cliente: 'Nombre cliente',
    fecha: new Date(),
    paga: true,
  };

  @Output() eliminarVenta$ = new EventEmitter<Venta>();
  @Output() editarVenta$ = new EventEmitter<Venta>();

  constructor() {}

  ngOnInit(): void {}

  editarVenta(venta: Venta) {
    this.editarVenta$.emit(venta);
  }

  eliminarVenta(venta: Venta) {
    this.eliminarVenta$.emit(venta);
  }
}
