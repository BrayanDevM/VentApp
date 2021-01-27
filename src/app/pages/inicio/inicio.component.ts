import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogVentaComponent } from 'src/app/components/dialog-venta/dialog-venta.component';
import { Venta, VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit, OnDestroy {
  ventasRecientes: Venta[] = [];

  ventaNueva = new Subscription();

  constructor(public dialog: MatDialog, private ventas$: VentasService) {}

  ngOnInit(): void {
    this.subVentaNueva();
  }

  ngOnDestroy(): void {
    this.desuscribir();
  }

  obtenerVentas() {
    this.ventas$.obtenerVentas().then((ventas: Venta[]) => {
      this.ventasRecientes = ventas;
    });
  }

  nuevaVenta(): void {
    this.dialog.open(DialogVentaComponent);
  }

  // Subscribers
  subVentaNueva(): void {
    this.ventaNueva = this.ventas$.ventaNueva$.subscribe((venta: Venta) => {
      console.log('Nueva venta subs', venta);
      this.ventasRecientes.unshift(venta);
    });
  }

  desuscribir() {
    this.ventaNueva.unsubscribe();
  }
}
