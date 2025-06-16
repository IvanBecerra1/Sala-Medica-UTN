import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { Turno } from '../../../core/models/turno';
import { TurnosService } from '../../../core/services/turnos.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-turnos-especialista',
  imports: [MaterialModule, NgClass,FormsModule,  NgIf, TitleCasePipe],
  templateUrl: './turnos-especialista.component.html',
  styleUrl: './turnos-especialista.component.scss'
})
export class TurnosEspecialistaComponent implements OnInit {
  turnos: Turno[] = [];
  turnosFiltrados: Turno[] = [];
  columnas: string[] = ['fechaTurno', 'hora', 'paciente', 'especialidad', 'estado', 'acciones'];
  busqueda: string = '';
  uidEspecialista: string = '';
  estadoSeleccionado: string = 'activos';
  constructor(private turnosService : TurnosService, private authService : AuthService){

  }
  ngOnInit(): void {
    this.authService.usuario$.subscribe(usuario => {
      if (usuario) {
        this.uidEspecialista = usuario.uid;
        console.log(this.uidEspecialista);

        this.turnosService.obtenerTurnosPorEspecialista(this.uidEspecialista).subscribe(turnos => {
          this.turnos = turnos;
          this.turnosFiltrados = [...this.turnos];

          console.log(this.turnos);
          this.filtrar("activos")

        });
      }
    });


  }
  
  filtrar(tipo: string) {
    this.estadoSeleccionado = tipo;

    if (tipo === 'activos') {
      this.turnosFiltrados = this.turnos.filter(t =>
        t.estado === 'pendiente' || t.estado === 'aceptado'
      );
    } else if (tipo === 'realizado') {
      this.turnosFiltrados = this.turnos.filter(t => 
        t.estado === 'realizado');
    } else if (tipo === 'cancelados') {
      this.turnosFiltrados = this.turnos.filter(t =>
        t.estado === 'cancelado' ||
        t.estado === 'rechazado'
      );
    }

   // this.aplicarFiltro(); // para aplicar búsqueda también
  }
  aplicarFiltro() {
    const filtro = this.busqueda.toLowerCase();
    this.turnosFiltrados = this.turnos.filter(t =>
      t.pacienteNombre.toLowerCase().includes(filtro) ||
      t.pacienteApellido.toLowerCase().includes(filtro) ||
      t.especialidad.toLowerCase().includes(filtro)
    );
  }

  puedeAceptar(t: Turno): boolean {
    return !['realizado', 'rechazado', 'aceptado', 'cancelado'].includes(t.estado);
  }

  puedeRechazar(t: Turno): boolean {
    return !['aceptado', 'realizado', 'rechazado', 'cancelado'].includes(t.estado);
  }

  puedeCancelar(t: Turno): boolean {
    return ['aceptado'].includes(t.estado);
  }

  puedeFinalizar(t: Turno): boolean {
    return t.estado === 'aceptado';
  }

  aceptarTurno(t: Turno) {
    this.turnosService.actualizarEstado(t, 'aceptado');
  }

  rechazarTurno(t: Turno) {
    const motivo = prompt("Motivo del rechazo:");
    if (motivo) {
      this.turnosService.actualizarEstado(t, 'rechazado', motivo);
    }
  }

  cancelarTurno(t: Turno) {
    const motivo = prompt("Motivo de cancelación:");
    if (motivo) {
      this.turnosService.actualizarEstado(t, 'cancelado', motivo);
    }
  }

  finalizarTurno(t: Turno) {
    const reseña = prompt("Ingrese reseña o diagnóstico:");
    if (reseña) {
      this.turnosService.actualizarEstado(t, 'realizado', reseña);
    }
  }

  verCancelacion(t: any) {
    alert(t.comentarioCancelacion || 'Sin reseña cargada');
  }

  verCalificacion(t: any) {
    alert(t.calificacionPaciente || 'Sin calificacion');
  }

  verDevolucion( t: any){
    alert(t.resenaEspecialista || 'Sin devolucion');
  }
  
  formatearFecha(timestamp: any): string {
    const fecha = timestamp.toDate(); // convierte a Date de JS
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();

    return `${dia}/${mes}/${anio}`; // o `${anio}-${mes}-${dia}`
  }
}