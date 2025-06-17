import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { LogsService } from '../../../core/services/logs.service';
import { NgChartsModule } from 'ng2-charts';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-graficos',  
  imports: [CommonModule, NgChartsModule],
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.scss'
})
export class GraficosComponent {

barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
    }
  };

  barChartLabels: string[] = [];
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Ingresos por usuario' }]
  };

  constructor(private logService: LogsService) {}

  ngOnInit(): void {
    this.logService.obtenerLogs().subscribe(logs => {
      const ingresosPorUsuario: { [key: string]: number } = {};

      logs.forEach(log => {
        const nombre = `${log.nombre} ${log.apellido}`;
        ingresosPorUsuario[nombre] = (ingresosPorUsuario[nombre] || 0) + 1;
      });

      this.barChartLabels = Object.keys(ingresosPorUsuario);
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [{
          data: Object.values(ingresosPorUsuario),
          label: 'Ingresos al sistema'
        }]
      };
    });
  }
}