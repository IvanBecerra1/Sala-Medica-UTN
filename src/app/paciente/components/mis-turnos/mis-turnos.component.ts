import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../../core/services/turnos.service';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Turno } from '../../../core/models/turno';
import { listAll } from '@angular/fire/storage';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
@Component({
  selector: 'app-mis-turnos',
  imports: [NgClass, NgIf, NgFor, TitleCasePipe, FormsModule, MaterialModule],
  templateUrl: './mis-turnos.component.html',
  styleUrl: './mis-turnos.component.scss'
})
export class MisTurnosComponent implements OnInit{
  turnos: any[] = [];
  turnosFiltrados: any[] = [];
  estadoSeleccionado: string = 'activos';
  uidPacienteActual = "VXd9ZZMGAue9mmcToYjlNJ3k51a2"; // reemplazá dinámicamente
  columnas: string[] = ['fechaSolicitado', 'mensaje', 'fechaTurno', 'especialista', 'especialidad', 'estado', 'acciones'];

  busqueda: string = '';
  constructor(private turnoService: TurnosService) {}

  ngOnInit(): void {
    this.turnoService.obtenerTurnosPorPaciente(this.uidPacienteActual).subscribe(turnos => {
      this.turnos = turnos;
      console.log("lista de turnos");
      console.log(turnos);
      this.filtrar('activos');
    });
  }

  filtrar(tipo: string) {
      this.estadoSeleccionado = tipo;

    /*if (tipo === 'activos') {
      this.turnosFiltrados = this.turnos.filter(t =>
        t.estado === 'pendiente' || t.estado === 'aceptado'
      );
    } else {
      this.turnosFiltrados = this.turnos.filter(t => t.estado === tipo);
    }*/
    this.aplicarFiltro(); 
  }
  aplicarFiltro() {
    let filtrados = this.turnos.filter(t => {
      if (this.estadoSeleccionado === 'activos') {
        return t.estado === 'pendiente' || t.estado === 'aceptado';
      } else if (this.estadoSeleccionado === "cancelado")
      {
        return t.estado === 'cancelado' || t.estado === 'rechazado';
      } 
      else {

        return t.estado === this.estadoSeleccionado;
      }
    });

    if (this.busqueda.trim()) {
      const filtro = this.busqueda.toLowerCase();
      filtrados = filtrados.filter(t =>
        (t.especialistaNombre + ' ' + t.especialistaApellido).toLowerCase().includes(filtro) ||
        t.especialidad.toLowerCase().includes(filtro)
      );
    }

    this.turnosFiltrados = filtrados;
  }
  cancelar(turno: Turno) {
 //   this.turnoService.cancelarTurno(turno);
  }

  abrirDialogoCancelar(turno: Turno) {
    const comentario = prompt("Ingrese un comentario del porqué cancela el turno:");
    if (comentario) {
      this.turnoService.cancelarTurno(turno, comentario);
    }
  }

  
  verMotivo(turno: any) {
    //const motivo = await this.turnoService.obtenerMotivoCancelacion(turno);
    alert('Motivo de cancelación: ' + turno.comentarioCancelacion);
  }

  verResena(turno: any) {
    //const motivo = await this.turnoService.obtenerMotivoCancelacion(turno);
    alert('Reseña: ' + turno.resenaEspecialista);
  }

  completarEncuesta(turno: Turno) {
    const Encuesta = prompt("Encuesta Test");
    if (Encuesta) {
      this.turnoService.encuestaAtencion(turno, Encuesta);
    }
  }

  calificarAtencion(turno: Turno) {
    const calificacion = prompt("¿Cómo fue la atención del especialista?");
    if (calificacion) {
      this.turnoService.calificarAtencion(turno, calificacion);
    }
  }

  formatearFecha(timestamp: any): string {
    const fecha = timestamp.toDate(); // convierte a Date de JS
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();

    return `${dia}/${mes}/${anio}`; // o `${anio}-${mes}-${dia}`
  }

}