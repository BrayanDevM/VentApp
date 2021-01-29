import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css'],
})
export class ListaClienteComponent implements OnInit {
  @Input() cliente: Cliente = {
    id: '0',
    nombre: 'Producto',
    anotacion: '',
  };

  @Output() eliminarCliente$ = new EventEmitter<Cliente>();
  @Output() editarCliente$ = new EventEmitter<Cliente>();

  constructor() {}

  ngOnInit(): void {}

  editarCliente(cliente: Cliente) {
    this.editarCliente$.emit(cliente);
  }

  eliminarCliente(cliente: Cliente) {
    this.eliminarCliente$.emit(cliente);
  }
}
