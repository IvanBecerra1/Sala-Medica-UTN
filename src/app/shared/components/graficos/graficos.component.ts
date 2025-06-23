import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { LogsService } from '../../../core/services/logs.service';
import { NgChartsModule } from 'ng2-charts';

import { CommonModule } from '@angular/common';
import { EstadisticasService } from '../../../core/services/estadisticas.service';
import { MaterialModule } from '../../../material.module';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-graficos',  
  imports: [CommonModule, NgChartsModule, MaterialModule],
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.scss'
})
export class GraficosComponent implements OnInit {
  @ViewChild('graficoDia') graficoDia!: ElementRef;
  @ViewChild('graficoEspecialidad') graficoEspecialidad!: ElementRef;
  @ViewChild('graficoSolicitados') graficoSolicitados!: ElementRef;
  @ViewChild('graficoFinalizados') graficoFinalizados!: ElementRef;
  @ViewChild('graficoLogs') graficoLogs!: ElementRef;

  graficoSeleccionado = 'dia';

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

  logIngresosChartData!: ChartData<'bar'>;
  turnosPorDiaChartData: ChartData<'bar'> = { labels: [], datasets: [{ data: [], label: 'Turnos por Día' }] };
  turnosPorEspecialidadChartData: ChartData<'pie'> = { labels: [], datasets: [{ data: [] }] };
  turnosSolicitadosChartData: ChartData<'bar'> = { labels: [], datasets: [{ data: [], label: 'Solicitados por Médico' }] };
  turnosFinalizadosChartData: ChartData<'bar'> = { labels: [], datasets: [{ data: [], label: 'Finalizados por Médico' }] };

  constructor(private estadisticasService: EstadisticasService) {}


  logChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Ingresos al sistema por usuario y día'
      },
      legend: {
        position: 'top',
      }
    }
  };

  async ngOnInit() {
    await this.cargarTurnosPorDia();
    await this.cargarTurnosPorEspecialidad();
    await this.cargarTurnosSolicitados();
    await this.cargarTurnosFinalizados();
    await this.cargarLogsUsuario();

  }

  async cargarLogsUsuario(){
    const datos = await this.estadisticasService.obtenerLogDeIngresos();

    const dias = Object.keys(datos).sort();
    const usuariosSet = new Set<string>();

    dias.forEach(dia => {
      Object.keys(datos[dia]).forEach(usuario => usuariosSet.add(usuario));
    });

    const usuarios = Array.from(usuariosSet);
    const datasets = usuarios.map(usuario => ({
      label: usuario,
      data: dias.map(dia => datos[dia][usuario] || 0)
    }));

    this.logIngresosChartData = {
      labels: dias,
      datasets: datasets
    };
  
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
    const desde = new Date('2025-06-23'); 
    const hasta = new Date('2025-07-23'); 

    const datos = await this.estadisticasService.obtenerTurnosSolicitadosPorMedico(desde, hasta);
    console.log('TURNOS SOLICITADO');
    console.log(datos);
    this.turnosSolicitadosChartData = {
      labels: datos.map(d => d.medico),
      datasets: [{ data: datos.map(d => d.cantidad), label: 'Solicitados por Médico' }]
    };
  }

  async cargarTurnosFinalizados() {
    const desde = new Date('2025-06-23'); 
    const hasta = new Date('2025-07-23'); 


    const datos = await this.estadisticasService.obtenerTurnosFinalizadosPorMedico(desde, hasta);
    console.log('TURNOS FINALIZADOS');
    console.log(datos);
    this.turnosFinalizadosChartData = {
      labels: datos.map(d => d.medico),
      datasets: [{ data: datos.map(d => d.cantidad), label: 'Finalizados por Médico' }]
    };
    }
  exportarGraficoActual() {
    switch (this.graficoSeleccionado) {
      case 'dia':
        this.generarPdfDelGrafico(this.graficoDia, 'Turnos por Día', 'turnos_dia.pdf');
        break;
      case 'especialidad':
        this.generarPdfDelGrafico(this.graficoEspecialidad, 'Turnos por Especialidad', 'turnos_especialidad.pdf');
        break;
      case 'solicitados':
        this.generarPdfDelGrafico(this.graficoSolicitados, 'Turnos Solicitados por Médico', 'turnos_solicitados.pdf');
        break;
      case 'finalizados':
        this.generarPdfDelGrafico(this.graficoFinalizados, 'Turnos Finalizados por Médico', 'turnos_finalizados.pdf');
        break;
      case 'logs':
        this.generarPdfDelGrafico(this.graficoLogs, 'Logs de Ingreso al Sistema', 'logs_ingresos.pdf');
        break;
    }
  }

  generarPdfDelGrafico(idCanvas: ElementRef, titulo: string, nombreArchivo: string) {
    const canvas: HTMLCanvasElement = idCanvas.nativeElement;
    const imgData = canvas.toDataURL('image/png');

    const doc = new jsPDF('landscape');
    doc.setFontSize(16);
    doc.text(titulo, 15, 20);
    doc.addImage(imgData, 'PNG', 10, 30, 270, 130); // ajusta tamaño

    doc.save(nombreArchivo);
  }

}
