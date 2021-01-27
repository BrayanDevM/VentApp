import { Component, Input, OnInit } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {}
}
