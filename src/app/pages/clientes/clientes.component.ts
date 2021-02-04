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

  async obtenerClientes() {
    this.clientesLista = await this.clientes$.obtenerClientes();
  }

  nuevoCliente() {
    this.dialog.open(DialogClienteComponent);
  }

  editarCliente(cliente: Cliente) {
    this.dialog.open(DialogClienteComponent, {
      data: cliente,
    });
  }

  eliminarCliente(cliente: Cliente) {
    const dialog = this.dialog.open(DialogConfirmaComponent, {
      data: {
        texto: `Eliminar ${cliente.nombre}, esta acción no puede deshacerse.`,
      },
    });
    dialog.afterClosed().subscribe((confirma) => {
      if (confirma) {
        this.clientes$.eliminarCliente(cliente.id);
      }
    });
  }
}
