import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tab } from 'bootstrap';
import { Venta, VentasService } from 'src/app/services/ventas.service';
import { DialogConfirmaComponent } from '../dialog-confirma/dialog-confirma.component';
import { DialogVentaComponent } from '../dialog-venta/dialog-venta.component';

@Component({
  selector: 'app-tabs-ventas',
  templateUrl: './tabs-ventas.component.html',
  styleUrls: ['./tabs-ventas.component.css'],
})
export class TabsVentasComponent implements OnInit {
  listaVentas: Venta[] = [];
  listaVentasDeben: Venta[] = [];
  listaVentasPagaron: Venta[] = [];

  constructor(private ventas$: VentasService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.obtenerVentas();
  }

  async obtenerVentas() {
    this.listaVentas = await this.ventas$.obtenerVentas();
    this.listaVentasDeben = this.filtrarListado(this.listaVentas, 'deudores');
    this.listaVentasPagaron = this.filtrarListado(this.listaVentas, 'pagadas');
  }

  filtrarListado(lista: Venta[], condicion: string) {
    switch (condicion) {
      case 'deudores':
        return lista.filter((venta: Venta) => venta.paga === false);
      case 'pagadas':
        return lista.filter((venta: Venta) => venta.paga === true);
      default:
        console.error('No se pudo filtrar la lista, condición inválida');
        return [];
    }
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
