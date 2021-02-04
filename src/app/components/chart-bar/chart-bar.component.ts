import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  colors: string[];
};

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.css'],
})
export class ChartBarComponent implements OnInit, OnChanges {
  @ViewChild('chart') chart: ChartComponent | any;
  chartOptions: ChartOptions;
  mesActual: number;

  // Configurables
  @Input() nombreSeries = 'Series';
  @Input() dataSeries: any[] = [];
  @Input() titulo = 'Título';
  @Input() tipoGrafica = 'Ventas';
  @Input() color = ['#2fc2d8'];

  constructor() {
    this.mesActual = new Date().getMonth();

    this.chartOptions = {
      series: [
        {
          name: this.nombreSeries,
          data: this.dataSeries,
        },
      ],
      colors: this.color,
      chart: {
        height: 250,
        type: 'bar',
      },
      title: {
        text: this.titulo,
        style: {
          fontSize: '18px',
          fontFamily: 'Lato',
          color: '#c7c8ca',
        },
      },
      xaxis: {
        categories: [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Dic',
        ],
      },
      yaxis: {
        show: false,
      },
    };
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.dataSeries.length > 0) {
      // actualizar gráfica
      this.chartOptions.title = {
        text: this.titulo,
        style: this.chartOptions.title.style,
      };
      this.chartOptions.series = [
        {
          name: this.nombreSeries,
          data: this.procesarSeries(this.dataSeries, this.tipoGrafica),
        },
      ];
      this.chartOptions.colors = this.color;
    }
  }

  procesarSeries(datos: any[], tipoGrafica: string): number[] {
    let series: any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    switch (tipoGrafica) {
      case 'Utilidades':
        datos.forEach((dato) => {
          let mesVenta = new Date(dato.fecha).getMonth();
          series[mesVenta] += dato.utilidadTotal;
        });
        return this.removerMesesPosteriores(series);

      default:
        datos.forEach((dato) => {
          let mesVenta = new Date(dato.fecha).getMonth();
          series[mesVenta] += 1;
        });
        return this.removerMesesPosteriores(series);
    }
  }

  removerMesesPosteriores(series: any[]) {
    series.splice(this.mesActual + 1);
    this.chartOptions.xaxis.categories.splice(this.mesActual + 1);
    return series;
  }
}
