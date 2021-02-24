import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogVentaComponent } from 'src/app/components/dialog-venta/dialog-venta.component';
import { ClientesService } from 'src/app/services/clientes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Venta, VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  listaVentas: Venta[] = [];
  nombreUsuario: string;

  ultimasVentas: Venta[] = [];
  clientesNumero = 0;

  ventaNueva = new Subscription();
  ventaEditada = new Subscription();
  ventaEliminada = new Subscription();

  constructor(
    public dialog: MatDialog,
    private usuarios$: UsuariosService,
    private ventas$: VentasService,
    private clientes$: ClientesService
  ) {
    this.nombreUsuario = this.usuarios$.usuario.nombre.split(' ')[0];
  }

  ngOnInit(): void {
    this.obtenerNumClientes();
    this.obtenerVentas();

    // Observables
    this.subVentaNueva();
    this.subVentaEditada();
    this.subVentaEliminada();
  }

  ngOnDestroy(): void {
    this.desuscribir();
  }

  obtenerVentas() {
    this.ventas$.obtenerVentas().subscribe((ventas) => {
      this.listaVentas = ventas;
      this.ultimasVentas = this.listarUltimas5Ventas(ventas);
    });
  }

  listarUltimas5Ventas(ventas: Venta[]) {
    let ultimas5Ventas = [];
    if (ventas.length < 5) {
      for (let i = 0; i < ventas.length; i++) {
        ultimas5Ventas.push(ventas[i]);
      }
    } else {
      for (let i = 0; i < 5; i++) {
        ultimas5Ventas.push(ventas[i]);
      }
    }
    return ultimas5Ventas;
  }

  obtenerNumClientes() {
    this.clientes$.obtenerClientes().subscribe((clientes) => {
      this.clientesNumero = clientes.length;
    });
  }

  nuevaVenta(): void {
    this.dialog.open(DialogVentaComponent);
  }

  editarVenta(venta: Venta) {
    const dialog = this.dialog.open(DialogVentaComponent, { data: venta });
    dialog.afterClosed().subscribe((confirma) => {
      // if (confirma) {
      //   this.ventas$.editarVenta(venta);
      // }
    });
  }

  // Subscribers ********************************************************
  subVentaNueva(): void {
    this.ventaNueva = this.ventas$.ventaNueva$.subscribe((venta: Venta) => {
      this.ultimasVentas.unshift(venta);
      // Si hay más de 5 en últimas ventas, elimina el último
      this.ultimasVentas.length > 5 ? this.ultimasVentas.splice(4, 1) : null;
    });
  }

  subVentaEditada(): void {
    this.ventaEditada = this.ventas$.ventaEditada$.subscribe((venta: Venta) => {
      const i = this.ultimasVentas.findIndex((v) => v.id === venta.id);
      if (i >= 0) {
        this.ultimasVentas.splice(i, 1, venta);
      }
    });
  }

  subVentaEliminada(): void {
    this.ventaEliminada = this.ventas$.ventaEliminada$.subscribe(
      (id: string) => {
        const i = this.ultimasVentas.findIndex((venta) => venta.id === id);
        i >= 0 ? this.ultimasVentas.splice(i, 1) : null;
        // Si hay más de 5 ventas en lista total la agrega
        this.listaVentas.length > 5
          ? this.ultimasVentas.push(this.listaVentas[4])
          : null;
      }
    );
  }

  salir() {
    this.usuarios$.cerrarSesion();
  }

  desuscribir() {
    this.ventaNueva.unsubscribe();
    this.ventaEditada.unsubscribe();
    this.ventaEliminada.unsubscribe();
  }
}
