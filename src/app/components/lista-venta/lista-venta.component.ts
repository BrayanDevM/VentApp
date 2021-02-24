import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Venta } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-lista-venta',
  templateUrl: './lista-venta.component.html',
  styleUrls: ['./lista-venta.component.css'],
})
export class ListaVentaComponent implements OnInit, OnChanges {
  @Input() venta: Venta = {
    id: '0',
    producto: 'Producto',
    precio: 0,
    recargoNocturno: 0,
    utilidad: 0,
    cantidad: 0,
    utilidadTotal: 0,
    cliente: 'Nombre cliente',
    fecha: new Date(),
    paga: true,
    totalVenta: 0,
  };

  @Output() eliminarVenta$ = new EventEmitter<Venta>();
  @Output() editarVenta$ = new EventEmitter<Venta>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.venta = this.venta;
  }

  editarVenta(venta: Venta) {
    this.editarVenta$.emit(venta);
  }
}
