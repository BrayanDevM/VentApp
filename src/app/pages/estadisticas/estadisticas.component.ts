import { Component, OnInit } from '@angular/core';
import { Venta, VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
})
export class EstadisticasComponent implements OnInit {
  ventas: Venta[] = [];

  constructor(private ventas$: VentasService) {}

  ngOnInit(): void {
    this.obtenerVentas();
  }

  async obtenerVentas() {
    // this.ventas = await this.ventas$.obtenerVentas();
  }
}
