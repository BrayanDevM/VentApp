import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tab } from 'bootstrap';
import { Cliente, ClientesService } from 'src/app/services/clientes.service';
import { Venta, VentasService } from 'src/app/services/ventas.service';
import { DialogConfirmaComponent } from '../dialog-confirma/dialog-confirma.component';
import { DialogVentaComponent } from '../dialog-venta/dialog-venta.component';

@Component({
  selector: 'app-tabs-ventas',
  templateUrl: './tabs-ventas.component.html',
  styleUrls: ['./tabs-ventas.component.css'],
})
export class TabsVentasComponent implements OnInit {
  // Lista BD
  ventas: Venta[] = [];

  // Listas filtradas
  listaTodos: Venta[] = [];
  listaVentasDeben: Venta[] = [];
  listaVentasPagaron: Venta[] = [];

  listaClientes: Cliente[] = [];

  constructor(
    private ventas$: VentasService,
    private clientes$: ClientesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerVentas();
    this.obtenerClientes();
  }

  async obtenerVentas() {
    this.ventas = await this.ventas$.obtenerVentas();
    this.crearListas();
  }

  async obtenerClientes() {
    this.listaClientes = await this.clientes$.obtenerClientes();
  }

  crearListas() {
    this.listaTodos = [...this.ventas];
    this.listaVentasDeben = [...this.filtrarListado(this.ventas, 'Sin pagar')];
    this.listaVentasPagaron = [...this.filtrarListado(this.ventas, 'Pagadas')];
  }

  filtrarListado(lista: Venta[], condicion: string) {
    switch (condicion) {
      case 'Sin pagar':
        return lista.filter((venta: Venta) => venta.paga === false);
      case 'Pagadas':
        return lista.filter((venta: Venta) => venta.paga === true);
      default:
        console.error('No se pudo filtrar la lista, condición inválida');
        return [];
    }
  }

  filtrarPorCliente(lista: string, clienteNombre: string) {
    switch (lista) {
      case 'Pagadas':
        if (clienteNombre === 'Sin filtro') {
          this.crearListas();
        } else {
          this.listaVentasPagaron = [
            ...this.filtrarListado(this.ventas, 'Pagadas'),
          ].filter((venta: Venta) => venta.cliente === clienteNombre);
        }
        break;
      case 'Sin pagar':
        if (clienteNombre === 'Sin filtro') {
          this.crearListas();
        } else {
          this.listaVentasDeben = [
            ...this.filtrarListado(this.ventas, 'Sin pagar'),
          ].filter((venta: Venta) => venta.cliente === clienteNombre);
        }
        break;
      default:
        if (clienteNombre === 'Sin filtro') {
          this.crearListas();
        } else {
          this.listaTodos = [...this.ventas].filter(
            (venta: Venta) => venta.cliente === clienteNombre
          );
        }
        break;
    }
  }

  ver(e: any) {
    console.log(e);
  }

  sumarVentas(ventas: Venta[]) {
    let suma = 0;
    ventas.forEach((venta: Venta) => {
      suma += venta.precio * venta.cantidad;
    });
    return suma;
  }

  incializatTabs() {
    const triggerTabList = [].slice.call(document.querySelectorAll('#myTab a'));
    triggerTabList.forEach((triggerEl: any) => {
      const tabTrigger = new Tab(triggerEl);

      triggerEl.addEventListener('click', (event: any) => {
        event.preventDefault();
        tabTrigger.show();
      });
    });
  }

  editarVenta(venta: Venta) {
    const dialog = this.dialog.open(DialogVentaComponent, { data: venta });
    dialog.afterClosed().subscribe((confirma) => {
      if (confirma) {
        this.ventas$.eliminarVenta(venta.id);
      }
    });
  }

  eliminarVenta(venta: Venta) {
    const dialog = this.dialog.open(DialogConfirmaComponent, {
      data: {
        texto: `Eliminar venta de ${venta.cliente}, esta acción no puede deshacerse.`,
      },
    });
    dialog.afterClosed().subscribe((confirma) => {
      if (confirma) {
        this.ventas$.eliminarVenta(venta.id);
      }
    });
  }
}
