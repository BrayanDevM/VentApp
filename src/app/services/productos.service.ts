import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  productos: Producto[] = [];

  productoNuevo$ = new EventEmitter<Producto>();
  productoEliminado$ = new EventEmitter<string>();
  productoActualizado$ = new EventEmitter<Producto>();

  constructor() {
    this.cargarLS();
  }

  async obtenerProductos(): Promise<any[]> {
    return this.productos;
  }

  async guardarProducto(producto: Producto): Promise<any> {
    producto.id = this.crearIdProducto();
    this.productos.unshift(producto);
    console.log(this.productos);

    this.almacenarEnLS();
    return {
      ok: true,
      producto,
    };
  }

  async editarProducto(producto: Producto): Promise<any> {
    const i = this.productos.findIndex((p: Producto) => p.id === producto.id);
    this.productos.splice(i, 1, producto);
    this.almacenarEnLS();
    return {
      ok: true,
      productoEditado: this.productos[i],
    };
  }

  async eliminarProducto(id: string): Promise<any> {
    const i = this.productos.findIndex(
      (producto: Producto) => producto.id === id
    );
    if (i >= 0) {
      this.productos.splice(i, 1);
      this.almacenarEnLS();
      return {
        ok: true,
        message: 'Producto eliminado',
      };
    } else {
      return {
        ok: false,
        message: 'No se ha podido eliminar el producto',
      };
    }
  }

  crearIdProducto(longitud = 18) {
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
    localStorage.setItem('productos', JSON.stringify(this.productos));
  }

  cargarLS() {
    if (localStorage.getItem('productos')) {
      this.productos = JSON.parse(localStorage.getItem('productos') + '');
    }
  }
}

export interface Producto {
  id: string;
  nombre: string;
  precioVenta: number;
  precioCompra: number;
  img: string;
  stock: number;
}
