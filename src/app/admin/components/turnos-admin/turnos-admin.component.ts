import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { Turno } from '../../../core/models/turno';
import { TurnosService } from '../../../core/services/turnos.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalResenaComponent } from '../../../shared/components/modal-resena/modal-resena.component';
import { ModalCalificacionComponent } from '../../../shared/components/modal-calificacion/modal-calificacion.component';
import { ModalMotivoComponent } from '../../../shared/components/modal-motivo/modal-motivo.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { CentrarTextoDirective } from '../../../core/directivas/centrar-texto.directive';

@Component({
  selector: 'app-turnos-admin',
  imports: [MaterialModule, NgClass,FormsModule,  NgIf, TitleCasePipe, CentrarTextoDirective],
  templateUrl: './turnos-admin.component.html',
  styleUrl: './turnos-admin.component.scss'
})
export class TurnosAdminComponent implements OnInit {
  turnos: Turno[] = [];
  turnosFiltrados: Turno[] = [];
  columnas: string[] = ['fechaTurno', 'hora', 'paciente', 'especialidad', 'especialista', 'estado', 'acciones'];
  busqueda: string = '';
  uidEspecialista: string = '';
  estadoSeleccionado: string = 'activos';
  usuario : any;
  constructor( private dialog: MatDialog, private toast : ToastService, private turnosService : TurnosService, private authService : AuthService){

  }
  ngOnInit(): void {
    this.authService.usuario$.subscribe(usuario => {
      if (usuario) {
        this.usuario = usuario;
       // this.uidEspecialista = usuario.uid;
     //   console.log(this.uidEspecialista);

        this.turnosService.obtenerTodoTurnos().subscribe(turnos => {
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
    return !['aceptado', 'realizado', 'rechazado', 'cancelado'].includes(t.estado);
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
    
   /* const motivo = prompt("Motivo de cancelación:");
    if (motivo) {
      this.turnosService.actualizarEstado(t, 'cancelado', motivo);
    }*/

       const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {
        titulo: 'Cancelar Turno',
        nombre: `${this.usuario.nombre} ${this.usuario.apellido} (${this.usuario.rol})`
      }
    });

    dialogRef.afterClosed().subscribe((motivo: string) => {
      if (motivo) {
        let comentario = this.usuario.nombre + "@"+this.usuario.apellido+"@"+this.usuario.rol+"@" + motivo
        this.turnosService.actualizarEstado(t, 'cancelado', comentario);
        console.log("Motivo ingresado:", motivo);
      }
    });
  }

  finalizarTurno(t: Turno) {
    const reseña = prompt("Ingrese reseña o diagnóstico:");
    if (reseña) {
      this.turnosService.actualizarEstado(t, 'realizado', reseña);
    }
  }

  verCancelacion(t: any) {
      //alert(t.comentarioCancelacion || 'Sin reseña cargada');
     
         this.dialog.open(ModalMotivoComponent, {
           width: '400px',
           data: {
             comentario: t.comentarioCancelacion 
           }
         });
       }
   

  verCalificacion(t: any) {
   if (!t.calificacionPaciente) {
         this.toast.mostrarMensaje("Este turno no tiene calificación registrada", "Calificación", "info");
       }
       this.dialog.open(ModalCalificacionComponent, {
         width: '500px',
         data: { modo: 'ver', id: t.calificacionPaciente }
       });
     }

  verDevolucion( t: any){
     /// alert(t.resenaEspecialista || 'Sin devolucion');
      if (!t.resenaEspecialista) {
        this.toast.mostrarMensaje("Este turno no tiene reseña registrada", "Reseña", "info");
        return;
      }
      const dialogRef = this.dialog.open(ModalResenaComponent, {
        width: '500px',
        data: { modo: 'ver', id: t.resenaEspecialista },
        disableClose: true
       });
     }
  formatearFecha(timestamp: any): string {
    const fecha = timestamp.toDate(); // convierte a Date de JS
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();

    return `${dia}/${mes}/${anio}`; // o `${anio}-${mes}-${dia}`
  }
}