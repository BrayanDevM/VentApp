import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  ventas: Venta[] = [];

  ventaNueva$ = new EventEmitter<Venta>();
  ventaEliminada$ = new EventEmitter<string>();
  ventaActualizada$ = new EventEmitter<Venta>();

  constructor() {}

  async obtenerVentas(): Promise<Venta[]> {
    return this.ventas;
  }

  async guardarVenta(venta: Venta) {
    this.ventas.unshift(venta);
    return true;
  }

  async eliminarVenta(id: string): Promise<boolean> {
    const i = this.ventas.findIndex((venta: Venta) => venta.id === id);
    if (i > 0) {
      this.ventas.splice(i, 1);
      return true;
    } else {
      return false;
    }
  }
}

export interface Venta {
  id: string;
  producto: string;
  precio: number;
  cantidad: number;
  cliente: string;
  paga: boolean;
  fecha: Date;
}
