import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../../core/services/turnos.service';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Turno } from '../../../core/models/turno';
import { listAll } from '@angular/fire/storage';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { AuthService } from '../../../core/services/auth.service';
import { ModalCalificacionComponent } from '../../../shared/components/modal-calificacion/modal-calificacion.component';
import { ModalEncuestaComponent } from '../../../shared/components/modal-encuesta/modal-encuesta.component';
import { ModalMotivoComponent } from '../../../shared/components/modal-motivo/modal-motivo.component';
import { ModalResenaComponent } from '../../../shared/components/modal-resena/modal-resena.component';
import { ToastService } from '../../../core/services/toast.service';
import { EncuestaCalificacionService } from '../../../core/services/encuesta-calificacion.service';
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
  uidPacienteActual = "VXd9ZZMGAue9mmcToYjlNJ3k51a2"; 
  columnas: string[] = ['fechaSolicitado', 'mensaje', 'fechaTurno', 'especialista', 'especialidad', 'estado', 'acciones'];

  busqueda: string = '';
  usuario : any;
  constructor(private turnoService: TurnosService, private servicio : EncuestaCalificacionService,private toast : ToastService,private dialog: MatDialog, private auth: AuthService) {}

  async ngOnInit() {
    this.auth.usuario$.subscribe(async (usuario) => {
      if (usuario) {
        this.usuario = usuario;

        this.turnoService.obtenerTurnosPorPaciente(usuario.uid).subscribe(async (turnos) => {
          const turnosCompletos = await Promise.all(turnos.map(async (turno: any) => {
            if (turno.resenaEspecialista) {
              const resena = await this.servicio.obtenerResena(turno.resenaEspecialista);
              return { ...turno, historiaClinica: resena };
            } else {
              return turno;
            }
          }));

          this.turnos = turnosCompletos;
          this.filtrar('activos');
        });
      }
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
  /*
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
  }*/

  async aplicarFiltro() {
      let filtrados = this.turnos.filter(t => {
        // Filtro por estado
        if (this.estadoSeleccionado === 'activos') {
          return t.estado === 'pendiente' || t.estado === 'aceptado';
        } else if (this.estadoSeleccionado === "cancelado") {
          return t.estado === 'cancelado' || t.estado === 'rechazado';
        } else {
          return t.estado === this.estadoSeleccionado;
        }
      });

      if (this.busqueda.trim()) {
        const filtro = this.busqueda.toLowerCase();
        filtrados = filtrados.filter(t => {
          const historia = t.historiaClinica || {};
          const dinamicos = historia.dinamicos?.map((d: any) => `${d.clave} ${d.valor}`).join(' ') || '';

          return (
            (t.especialistaNombre + ' ' + t.especialistaApellido).toLowerCase().includes(filtro) ||
            t.especialidad?.toLowerCase().includes(filtro) ||
            historia.altura?.toLowerCase().includes(filtro) ||
            historia.peso?.toLowerCase().includes(filtro) ||
            historia.temperatura?.toLowerCase().includes(filtro) ||
            historia.presion?.toLowerCase().includes(filtro) ||
            dinamicos.toLowerCase().includes(filtro)
          );
        });
      }

      this.turnosFiltrados = filtrados;
  }

  cancelar(turno: Turno) {
 //   this.turnoService.cancelarTurno(turno);
  }


  
  abrirDialogoCancelar(turno: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {
        titulo: 'Cancelar Turno',
        nombre: `${turno.pacienteNombre} ${turno.pacienteApellido} (${this.usuario.rol})`
      }
    });

    dialogRef.afterClosed().subscribe((motivo: string) => {
      if (motivo) {
        let comentario = turno.pacienteNombre + "@"+turno.pacienteApellido+"@"+this.usuario.rol+"@" + motivo
        this.turnoService.cancelarTurno(turno, comentario);
        console.log("Motivo ingresado:", motivo);
      }
    });
  }

  abrirDialogoCancelar2(turno: Turno) {
    const comentario = prompt("Ingrese un comentario del porqué cancela el turno:");
    if (comentario) {
      this.turnoService.cancelarTurno(turno, comentario);
    }
  }

  
  verMotivo(turno: any) {
   //alert(t.comentarioCancelacion || 'Sin reseña cargada');
  
      this.dialog.open(ModalMotivoComponent, {
        width: '400px',
        data: {
          comentario: turno.comentarioCancelacion 
        }
      });
    }

  verResena(turno: any) {
    //const motivo = await this.turnoService.obtenerMotivoCancelacion(turno);
    if (!turno.resenaEspecialista) {
          this.toast.mostrarMensaje("Este turno no tiene reseña registrada", "Reseña", "info");
        
          return;
        }
        const dialogRef = this.dialog.open(ModalResenaComponent, {
          width: '500px',
          data: { modo: 'ver', id: turno.resenaEspecialista },
          disableClose: true
         });
       }

  completarEncuesta(turno: Turno) {
    const dialogRef = this.dialog.open(ModalEncuestaComponent, {
      data: { modo: 'crear' },
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.turnoService.encuestaAtencion(turno, resultado);
      }
    });
  }
  
  verEncuesta(t: any) {
    if (!t.encuestaPaciente) {
      this.toast.mostrarMensaje("Este turno no tiene encuesta registrada", "Encuesta", "info");
      return;
    }

    this.dialog.open(ModalEncuestaComponent, {
      width: '500px',
      data: { modo: 'ver', id: t.encuestaPaciente }
    });
  }
    /*const Encuesta = prompt("Encuesta Test");
    if (Encuesta) {
      this.turnoService.encuestaAtencion(turno, Encuesta);
    }
  }*/

  calificarAtencion(turno: Turno) {
    const dialogRef = this.dialog.open(ModalCalificacionComponent, {
      data: { modo: 'crear' },
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.turnoService.calificarAtencion(turno, resultado);
      }
    });
  }
    /*
    const calificacion = prompt("¿Cómo fue la atención del especialista?");
    if (calificacion) {
      this.turnoService.calificarAtencion(turno, calificacion);
    }
  }*/

  formatearFecha(timestamp: any): string {
    const fecha = timestamp.toDate(); // convierte a Date de JS
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();

    return `${dia}/${mes}/${anio}`; // o `${anio}-${mes}-${dia}`
  }

}