import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  productos = [
    {
      nombre: 'Poker',
      precio: 2500,
      img: '',
    },
    {
      nombre: 'Poker 750ml',
      precio: 4000,
      img: '',
    },
    {
      nombre: 'Águila Light',
      precio: 2500,
      img: '',
    },
    {
      nombre: 'Club Colombia',
      precio: 2500,
      img: '',
    },
  ];

  constructor() {}

  async obtenerProductos(): Promise<any[]> {
    return this.productos;
  }
}
