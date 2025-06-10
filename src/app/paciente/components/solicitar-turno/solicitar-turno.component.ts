import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../../core/services/turnos.service';
import { Turno } from '../../../core/models/turno';
import { MaterialModule } from '../../../material.module';
import { NgFor, NgIf } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../core/services/usuario.service';

import { NgClass } from '@angular/common'; // <-- Añade esta línea
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-solicitar-turno',
  imports: [MaterialModule, NgFor, NgIf,FormsModule,NgClass ],
  templateUrl: './solicitar-turno.component.html',
  styleUrl: './solicitar-turno.component.scss'
})
export class SolicitarTurnoComponent implements OnInit {
  especialidades: string[] = ['Dermatología', 'pediatra', 'psicologia']; // o cargalas desde DB si querés
  especialidadSeleccionada: string = '';
  especialistasFiltrados: any[] = [];
  especialistaSeleccionado: any;

  fechasDisponibles: string[] = [];
  fechaSeleccionada: string = '';
  horariosDisponibles: { hora: string; estado: 'disponible' | 'ocupado' }[] = [];


  usuarioLogueado: any | null = null;  
  
  pacientes: any;
  pacienteSeleccionado: any;

  constructor(private turnosService : TurnosService, 
    private toastService : ToastService,
    private usuariosService : UsuarioService,
    private auth : AuthService,
  ){

  }
  ngOnInit(): void {
    this.auth.usuario$.subscribe((usuario) => {
      if (usuario) {
        this.usuarioLogueado = usuario;
      } else {
        this.usuarioLogueado = { rol: 'no-registrado' };
      }
    });

   // this.cargarPacientes();
  }

  cargarEspecialistas() {
    this.usuariosService.getUsuarios().subscribe(usuarios => {
      this.especialistasFiltrados = usuarios.filter(
        u => u.rol === 'especialista' && u.aprobado && u.especialidades.includes(this.especialidadSeleccionada)
      );
    });
  }
  generarFechasDisponibles(especialista: any): string[] {
    const diasPermitidos = especialista.disponibilidad[0].días.map((d: string) => d.toLowerCase());
    const fechas: string[] = [];
    const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    const hoy = new Date();

    for (let i = 0; fechas.length < 15; i++) {
      const fecha = new Date();
      fecha.setDate(hoy.getDate() + i);
      const nombreDia = diasSemana[fecha.getDay()];
      if (diasPermitidos.includes(nombreDia)) {
        fechas.push(fecha.toISOString().split('T')[0]);
      }
    }
    return fechas;
  }

  generarHorarios(especialista: any): string[] {
    const tramos = especialista.disponibilidad?.horarios || [];
    const resultado: string[] = [];

    for (const tramo of tramos) {
      const [desde, hasta] = tramo.replace('.', ':').split(' a ');
      let [h, m] = desde.split(':').map(Number);
      const [hFin, mFin] = hasta.split(':').map(Number);

      while (h < hFin || (h === hFin && m < mFin)) {
        resultado.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
        m += 30;
        if (m === 60) {
          m = 0;
          h++;
        }
      }
    }

    return resultado;
  }
  cargarFechasDisponibles() {
    this.fechaSeleccionada = '';
    this.fechasDisponibles = [];

    console.log("ESPECIALISTA SELECCIONADO");
    console.log(this.especialistaSeleccionado);
    console.log(this.especialistaSeleccionado.disponibilidad);


  //  if (!this.especialistaSeleccionado?.disponibilidad?.[0]) return;

    const diasPermitidos = "lunes"//this.especialistaSeleccionado.disponibilidad[0].dias.map((d: string) => d.toLowerCase());
    const diasSemana = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
    const hoy = new Date();

    for (let i = 0; this.fechasDisponibles.length < 15; i++) {
      const fecha = new Date();
      fecha.setDate(hoy.getDate() + i);
      const nombreDia = diasSemana[fecha.getDay()];
      if (diasPermitidos.includes(nombreDia)) {
        this.fechasDisponibles.push(fecha.toISOString().split('T')[0]);
      }
    }

    console.log("FECHAS CARGADAS:");
    console.log(this.fechasDisponibles);
  }

  async seleccionarFecha(fecha: string) {
    this.fechaSeleccionada = fecha;

    const horarios = this.generarHorarios(this.especialistaSeleccionado);
    const ocupados: string[] = [];

    const turnos = await this.turnosService.getTurnosByEspecialistaFecha(
      this.especialistaSeleccionado.uid, fecha
    );

    turnos.forEach(t => {
      if (['pendiente', 'aceptado'].includes(t.estado)) {
        ocupados.push(t.hora);
      }
    });

    this.horariosDisponibles = horarios.map(h => ({
      hora: h,
      estado: ocupados.includes(h) ? 'ocupado' : 'disponible'
    }));
  }



  async reservarTurno(fecha: string, hora: string) {
    const disponible = await this.turnosService.verificarDisponibilidad(this.especialistaSeleccionado.uid, fecha, hora);

    if (!disponible) {
      this.toastService.mostrarMensaje('Horario ocupado', 'Ese turno ya fue solicitado.', 'info');
      return;
    }

    const turno: Turno = {
      especialidad: this.especialidadSeleccionada,
      fecha,
      hora,
      estado: 'pendiente',

      especialistaUid: this.especialistaSeleccionado.uid,
      especialistaNombre: this.especialistaSeleccionado.nombre,
      especialistaApellido: this.especialistaSeleccionado.apellido,
      especialistaDni: this.especialistaSeleccionado.dni,

      pacienteUid: this.usuarioLogueado.uid,
      pacienteNombre: this.usuarioLogueado.nombre,
      pacienteApellido: this.usuarioLogueado.apellido,
      pacienteDni: this.usuarioLogueado.dni,
      obraSocial: this.usuarioLogueado.obraSocial
    };

    await this.turnosService.guardarTurno(turno);
    this.toastService.mostrarMensaje('Éxito', 'Turno reservado correctamente.', 'success');
  }


}
