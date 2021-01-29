import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  clientes: Cliente[] = [];

  clienteNuevo$ = new EventEmitter<Cliente>();
  clienteEliminado$ = new EventEmitter<string>();
  clienteActualizado$ = new EventEmitter<Cliente>();

  constructor() {
    this.cargarLS();
  }

  async obtenerClientes(): Promise<any[]> {
    return this.clientes;
  }

  async guardarCliente(cliente: Cliente) {
    cliente.id = this.crearIdCliente();
    this.clientes.unshift(cliente);
    console.log(this.clientes);

    this.almacenarEnLS();
    return cliente;
  }

  async editarCliente(cliente: Cliente) {
    const i = this.clientes.findIndex((v: Cliente) => v.id === cliente.id);
    this.clientes.splice(i, 1, cliente);
    this.almacenarEnLS();
    return true;
  }

  async eliminarCliente(id: string): Promise<boolean> {
    const i = this.clientes.findIndex((cliente: Cliente) => cliente.id === id);
    if (i >= 0) {
      this.clientes.splice(i, 1);
      this.almacenarEnLS();
      return true;
    } else {
      return false;
    }
  }

  crearIdCliente(longitud = 18) {
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
    localStorage.setItem('clientes', JSON.stringify(this.clientes));
  }

  cargarLS() {
    if (localStorage.getItem('clientes')) {
      this.clientes = JSON.parse(localStorage.getItem('clientes') + '');
    }
  }
}

export interface Cliente {
  id: string;
  nombre: string;
  anotacion: string;
}
