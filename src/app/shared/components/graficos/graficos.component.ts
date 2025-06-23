import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { LogsService } from '../../../core/services/logs.service';
import { NgChartsModule } from 'ng2-charts';

import { CommonModule } from '@angular/common';
import { EstadisticasService } from '../../../core/services/estadisticas.service';
import { MaterialModule } from '../../../material.module';
@Component({
  selector: 'app-graficos',  
  imports: [CommonModule, NgChartsModule, MaterialModule],
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.scss'
})
export class GraficosComponent implements OnInit {
  graficoSeleccionado = 'dia';

  // Opciones de gráficos
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
    }
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    }
  };

  // Datos de cada gráfico
  turnosPorDiaChartData: ChartData<'bar'> = { labels: [], datasets: [{ data: [], label: 'Turnos por Día' }] };
  turnosPorEspecialidadChartData: ChartData<'pie'> = { labels: [], datasets: [{ data: [] }] };
  turnosSolicitadosChartData: ChartData<'bar'> = { labels: [], datasets: [{ data: [], label: 'Solicitados por Médico' }] };
  turnosFinalizadosChartData: ChartData<'bar'> = { labels: [], datasets: [{ data: [], label: 'Finalizados por Médico' }] };

  constructor(private estadisticasService: EstadisticasService) {}

  async ngOnInit() {
    await this.cargarTurnosPorDia();
    await this.cargarTurnosPorEspecialidad();
    await this.cargarTurnosSolicitados();
    await this.cargarTurnosFinalizados();
  }

  async cargarTurnosPorDia() {
    const datos = await this.estadisticasService.obtenerTurnosPorDia();
    console.log('TURNOS POR DIA');
    console.log(datos);
    this.turnosPorDiaChartData = {
      labels: datos.map(d => d.fecha),
      datasets: [{ data: datos.map(d => d.cantidad), label: 'Turnos por Día' }]
    };
  }

  async cargarTurnosPorEspecialidad() {
    
    const datos = await this.estadisticasService.estadisticaCantidadTurnosEspecialidad();
    console.log('TURNOS POR ESPECIALIDAD');
    console.log(datos);
    this.turnosPorEspecialidadChartData = {
      labels: datos.map(d => d.especialidad),
      datasets: [{ data: datos.map(d => d.cantidad) }]
    };
  }

  async cargarTurnosSolicitados() {
    const desde = new Date();
    desde.setMonth(desde.getMonth() - 1); // último mes
    const hasta = new Date();

    const datos = await this.estadisticasService.obtenerTurnosSolicitadosPorMedico(desde, hasta);
    console.log('TURNOS SOLICITADO');
    console.log(datos);
    this.turnosSolicitadosChartData = {
      labels: datos.map(d => d.medico),
      datasets: [{ data: datos.map(d => d.cantidad), label: 'Solicitados por Médico' }]
    };
  }

  async cargarTurnosFinalizados() {
    const desde = new Date();
    desde.setMonth(desde.getMonth() - 1);
    const hasta = new Date();

    const datos = await this.estadisticasService.obtenerTurnosFinalizadosPorMedico(desde, hasta);
    console.log('TURNOS FINALIZADOS');
    console.log(datos);
    this.turnosFinalizadosChartData = {
      labels: datos.map(d => d.medico),
      datasets: [{ data: datos.map(d => d.cantidad), label: 'Finalizados por Médico' }]
    };
  }
}
