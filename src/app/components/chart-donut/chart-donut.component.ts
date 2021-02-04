import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexDataLabels,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTitleSubtitle,
  ChartComponent,
} from 'ng-apexcharts';
import { Venta } from 'src/app/services/ventas.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-chart-donut',
  templateUrl: './chart-donut.component.html',
  styleUrls: ['./chart-donut.component.css'],
})
export class ChartDonutComponent implements OnInit, OnChanges {
  @ViewChild('chart') chart: ChartComponent | any;
  public chartOptions: ChartOptions | Partial<any>;

  // Configurable
  @Input() data: any[] = [];
  @Input() titulo = 'Título';
  @Input() colores = ['#2fc2d8'];

  constructor() {
    this.chartOptions = {
      series: [], // <- valores gráfica
      chart: {
        type: 'donut',
      },
      labels: [], // <- Etiquetas de valores
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%',
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      title: {
        text: this.titulo,
        style: {
          fontSize: '18px',
          fontFamily: 'Lato',
          color: '#c7c8ca',
        },
      },
    };
  }

  ngOnInit(): void {}

  async ngOnChanges() {
    if (this.data.length > 0) {
      let indices;
      let ventasPorProducto;

      indices = await this.crearIndicesProductos();
      ventasPorProducto = await this.contarProdVendidos(this.data, indices);

      // console.log(this.data, 'data');
      // console.log(indices, 'productos en ventas');
      // console.log(ventasPorProducto, 'Ventas por producto');

      this.chartOptions.title = {
        text: this.titulo,
        style: this.chartOptions.title.style,
      };

      this.chartOptions.series = ventasPorProducto;
      this.chartOptions.labels = indices;
    }
  }

  /**
   * Toma las ventas, y crea un arreglo con los productos
   * que hay en dichas ventas, esto para pasar a grafica donut y evaluar
   * dentro del mismo el conteo de series
   */
  crearIndicesProductos(): Promise<string[]> {
    return new Promise((resolve) => {
      let productos: string[] = [];
      this.data.forEach((registro) => {
        if (!productos.includes(registro.producto)) {
          productos.push(registro.producto);
        }
      });
      resolve(productos);
    });
  }

  /**
   * Por cada producto recorre las ventas y crea un nuevo
   * arreglo con las ventas de dicho producto
   * @param ventas
   */
  contarProdVendidos(ventas: Venta[], indices: string[]) {
    return new Promise((resolve) => {
      // arreglo donde se guardan el num de ventas
      let ventasPorProducto: any[] = [];

      // por cada producto crea un contador
      indices.forEach((producto) => {
        let cantidadVendida = 0;
        // filter retorna un nuevo array con el filtro por producto
        // recorremos el mismo arreglo y sumamos la cantidad en venta a variable cant
        ventas
          .filter((venta) => venta.producto === producto)
          .forEach((venta) => (cantidadVendida += venta.cantidad));

        // agregamos cant vendida (ver en detalle)
        // ventasPorProducto.push({
        //   producto,
        //   ventas: cantidadVendida,
        // });

        // agregamos cant vendida
        ventasPorProducto.push(cantidadVendida);
      });

      resolve(ventasPorProducto);
    });
  }
}
