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

  async guardarCliente(cliente: Cliente): Promise<any> {
    cliente.id = this.crearIdCliente();
    this.clientes.unshift(cliente);

    this.almacenarEnLS();
    return {
      ok: true,
      cliente,
    };
  }

  async editarCliente(cliente: Cliente): Promise<any> {
    const i = this.clientes.findIndex((v: Cliente) => v.id === cliente.id);
    this.clientes.splice(i, 1, cliente);
    this.almacenarEnLS();
    return {
      ok: true,
      clienteEditado: cliente,
    };
  }

  async eliminarCliente(id: string): Promise<any> {
    const i = this.clientes.findIndex((cliente: Cliente) => cliente.id === id);
    if (i >= 0) {
      this.clientes.splice(i, 1);
      this.almacenarEnLS();
      return {
        ok: true,
        message: 'Cliente eliminado correctamente',
      };
    } else {
      return {
        ok: false,
        message: 'No se ha podido eliminar el cliente',
      };
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
