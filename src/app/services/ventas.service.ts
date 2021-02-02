import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  ventas: Venta[] = [];

  ventaNueva$ = new EventEmitter<Venta>();
  ventaEliminada$ = new EventEmitter<string>();
  ventaActualizada$ = new EventEmitter<Venta>();

  constructor() {
    this.cargarLS();
  }

  async obtenerVentas(): Promise<Venta[]> {
    return this.ventas;
  }

  async guardarVenta(venta: Venta): Promise<any> {
    venta.id = this.crearIdVenta();
    this.ventas.unshift(venta);
    this.almacenarEnLS();
    console.log(this.ventas);

    return {
      ok: true,
      venta,
    };
  }

  async editarVenta(venta: Venta): Promise<any> {
    const i = this.ventas.findIndex((v: Venta) => v.id === venta.id);
    this.ventas.splice(i, 1, venta);
    this.almacenarEnLS();
    return {
      ok: true,
      ventaEditada: venta,
    };
  }

  async eliminarVenta(id: string): Promise<any> {
    const i = this.ventas.findIndex((venta: Venta) => venta.id === id);
    if (i >= 0) {
      this.ventas.splice(i, 1);
      this.almacenarEnLS();
      return {
        ok: true,
        message: 'Venta eliminada correctamente',
      };
    } else {
      return {
        ok: false,
        message: 'No se puedo eliminar la venta',
      };
    }
  }

  crearIdVenta(longitud = 18) {
    let resultado = '';
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstvwxyz0123456789';
    const caracteresLength = caracteres.length;
    for (let i = 0; i < longitud; i++) {
      resultado += caracteres.charAt(
        Math.floor(Math.random() * caracteresLength)
      );
    }
    return resultado;
  }

  almacenarEnLS() {
    localStorage.setItem('ventas', JSON.stringify(this.ventas));
  }

  cargarLS() {
    if (localStorage.getItem('ventas')) {
      this.ventas = JSON.parse(localStorage.getItem('ventas') + '');
    }
  }
}

export interface Venta {
  id: string;
  producto: string;
  precio: number;
  utilidad: number;
  cantidad: number;
  utilidadTotal: number;
  cliente: string;
  paga: boolean;
  fecha: Date;
}
