import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { Turno } from '../../../core/models/turno';
import { TurnosService } from '../../../core/services/turnos.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalMotivoComponent } from '../../../shared/components/modal-motivo/modal-motivo.component';
import { ToastService } from '../../../core/services/toast.service';
import { ModalResenaComponent } from '../../../shared/components/modal-resena/modal-resena.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ModalCalificacionComponent } from '../../../shared/components/modal-calificacion/modal-calificacion.component';
import { EncuestaCalificacionService } from '../../../core/services/encuesta-calificacion.service';
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
  usuario : any;
  estadoSeleccionado: string = 'activos';
  constructor(private turnosService : TurnosService, private servicio : EncuestaCalificacionService, private authService : AuthService, private dialog: MatDialog, private toast : ToastService){

  }
  ngOnInit(): void {
    this.authService.usuario$.subscribe(usuario => {
      if (usuario) {
        this.uidEspecialista = usuario.uid;
        this.usuario = usuario;
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
  /*aplicarFiltro() {
    const filtro = this.busqueda.toLowerCase();
    this.turnosFiltrados = this.turnos.filter(t =>
      t.pacienteNombre.toLowerCase().includes(filtro) ||
      t.pacienteApellido.toLowerCase().includes(filtro) ||
      t.especialidad.toLowerCase().includes(filtro)
    );
  }*/

    async aplicarFiltro() {
    const filtro = this.busqueda.toLowerCase();

    const promesas = this.turnos
      .filter(t => {
        if (this.estadoSeleccionado === 'activos') {
          return t.estado === 'pendiente' || t.estado === 'aceptado';
        } else if (this.estadoSeleccionado === 'realizado') {
          return t.estado === 'realizado';
        } else if (this.estadoSeleccionado === 'cancelados') {
          return t.estado === 'cancelado' || t.estado === 'rechazado';
        }
        return true;
      })
      .map(async (t : any) => {
        let texto = `${t.pacienteNombre} ${t.pacienteApellido} ${t.especialidad}`.toLowerCase();

        if (t.resenaEspecialista) {
          try {
            const resenaSnap = await this.servicio.obtenerResena(t.resenaEspecialista);
            if (resenaSnap) {
              const { altura, peso, temperatura, presion, dinamicos = [] } = resenaSnap;

              texto += ` ${altura} ${peso} ${temperatura} ${presion}`;
              texto += dinamicos.map((d: any) => ` ${d.clave} ${d.valor}`).join('');
            }
          } catch (error) {
            console.warn('Error al obtener reseña:', error);
          }
        }

        return texto.includes(filtro) ? t : null;
      });

    const resultados = await Promise.all(promesas);
    this.turnosFiltrados = resultados.filter((t): t is Turno => t !== null);
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
   /* const motivo = prompt("Motivo del rechazo:");
    if (motivo) {
      this.turnosService.actualizarEstado(t, 'rechazado', motivo);
    }*/ 
    
    const dialogRef = this.dialog.open(ModalComponent, {
            width: '400px',
            data: {
              titulo: 'Rechazar Turno',
              nombre: `${t.especialistaNombre} ${t.especialistaApellido} (${this.usuario.rol})`
            }
          });
      
          dialogRef.afterClosed().subscribe((motivo: string) => {
            if (motivo) {
              let comentario = t.especialistaNombre + "@"+t.especialistaApellido+"@"+this.usuario.rol+"@" + motivo
              
              this.turnosService.actualizarEstado(t, 'rechazado', comentario);
              console.log("Motivo ingresado:", motivo);
            }
          });
  }

  cancelarTurno(t: Turno) {
      const dialogRef = this.dialog.open(ModalComponent, {
            width: '400px',
            data: {
              titulo: 'Cancelar Turno',
              nombre: `${t.especialistaNombre} ${t.especialistaApellido} (${this.usuario.rol})`
            }
          });
      
          dialogRef.afterClosed().subscribe((motivo: string) => {
            if (motivo) {
              let comentario = t.especialistaNombre + "@"+t.especialistaApellido+"@"+this.usuario.rol+"@" + motivo
              
              this.turnosService.actualizarEstado(t, 'cancelado', comentario);
              console.log("Motivo ingresado:", motivo);
            }
          });
  }

  finalizarTurno(t: Turno) {

    const dialogRef = this.dialog.open(ModalResenaComponent, {
      width: '500px',
      data: { modo: 'crear' },
      disableClose: true
     });
 
     dialogRef.afterClosed().subscribe((resultado) => {
       if (resultado) { // id
        console.log("id resena: "+ resultado);
        this.turnosService.actualizarEstado(t, 'realizado', resultado);
         
       }
     });
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