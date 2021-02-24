import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogClienteComponent } from 'src/app/components/dialog-cliente/dialog-cliente.component';
import { DialogConfirmaComponent } from 'src/app/components/dialog-confirma/dialog-confirma.component';
import { Cliente, ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientesLista: Cliente[] = [];

  constructor(public dialog: MatDialog, private clientes$: ClientesService) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes() {
    this.clientes$.obtenerClientes().subscribe((clientes) => {
      this.clientesLista = clientes;
    });
  }

  nuevoCliente() {
    this.dialog.open(DialogClienteComponent);
  }

  editarCliente(cliente: Cliente) {
    this.dialog.open(DialogClienteComponent, {
      data: cliente,
    });
  }
}
