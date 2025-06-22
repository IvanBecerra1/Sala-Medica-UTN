import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../../core/services/turnos.service';
import { Turno } from '../../../core/models/turno';
import { MaterialModule } from '../../../material.module';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../core/services/usuario.service';

import { NgClass } from '@angular/common'; // <-- Añade esta línea
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-solicitar-turno',
  imports: [MaterialModule, NgFor, NgIf,FormsModule,NgClass , DatePipe],
  templateUrl: './solicitar-turno.component.html',
  styleUrl: './solicitar-turno.component.scss'
})
export class SolicitarTurnoComponent implements OnInit {
  especialidades: string[] = [''];
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

    this.cargarListaEspecialidades();
   // this.cargarPacientes();
  }

  async cargarListaEspecialidades(){
    this.especialidades = await this.usuariosService.obtenerEspecialidadesUnicas();
  }

  tieneImagenEspecialidad(esp: string): boolean {
    console.log('tieneImagenEspecialidad');
    console.log(esp);
    const disponibles = ['Cardiología', 'Pediatría', 'Dermatología'];
    return disponibles.includes(esp);
  }

  
  seleccionarEspecialidad(esp: string) {
    this.especialidadSeleccionada = esp;
    this.cargarEspecialistas();
    this.especialistaSeleccionado = null;
    this.fechaSeleccionada = '';
    this.fechasDisponibles = [];
    this.horariosDisponibles = [];
  }

  seleccionarProfesional(prof: any) {
    this.especialistaSeleccionado = prof;
    this.cargarFechasDisponibles();
    this.fechaSeleccionada = '';
    this.horariosDisponibles = [];
  }

  cargarEspecialistas() {
    this.especialistaSeleccionado = null;
    this.fechaSeleccionada = '';
    this.fechasDisponibles = [];
    this.horariosDisponibles = [];
    
    this.usuariosService.getUsuarios().subscribe((usuarios) => {
      this.especialistasFiltrados = usuarios.filter(
        (u) => u.rol === 'especialista' 
            && u.aprobado 
            && u.especialidades.includes(this.especialidadSeleccionada)
      );
    });
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
    this.horariosDisponibles = [];
    this.fechaSeleccionada = '';
    this.fechasDisponibles = [];

    console.log("ESPECIALISTA SELECCIONADO");
    console.log(this.especialistaSeleccionado);
    console.log(this.especialistaSeleccionado.disponibilidad);


  //  if (!this.especialistaSeleccionado?.disponibilidad?.[0]) return;

    const diasPermitidos = this.especialistaSeleccionado.disponibilidad;
    /*
    Datos que devuelve disponibilidad:
    disponibilidad {
      dias : [""]
      horarios : [""]
    }
    */
   if (
      !diasPermitidos ||
      !Array.isArray(diasPermitidos.dias) || diasPermitidos.dias.length === 0 ||
      !Array.isArray(diasPermitidos.horarios) || diasPermitidos.horarios.length === 0
    ) {
      this.toastService.mostrarMensaje('El especialista no tiene horarios/días disponibles', 'Solicitud turnos', 'info');
      return;
    }
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    const hoy = new Date();

    let forVar=1;
    switch (diasPermitidos.dias.length){
      case 1: forVar = 3; break
      case 2: forVar = 5; break;
      case 3: forVar = 7; break;
      case 4: forVar = 9; break;
      case 5: forVar = 11; break;
      case 6: forVar = 13; break;

    }
    console.log("dias leght: " + diasPermitidos.dias.length );
    console.log("for contador: " + (forVar));
    console.log("for contador multipli: " + (2 + (diasPermitidos.dias.length + diasPermitidos.dias.length-1) ))

    for (let i = 0; this.fechasDisponibles.length < forVar; i++) {
      const fecha = new Date();
      fecha.setDate(hoy.getDate() + i);
      const nombreDia = diasSemana[fecha.getDay()];
      if (diasPermitidos.dias.includes(nombreDia)) {
        this.fechasDisponibles.push(fecha.toISOString().split('T')[0]);
      }
    }

    console.log("FECHAS CARGADAS:");
    console.log(this.fechasDisponibles);
  }
  async seleccionarFecha(fecha: string) {
    this.fechaSeleccionada = fecha;
    const horarios = this.generarHorarios(this.especialistaSeleccionado);

    const verificaciones = await Promise.all(
      horarios.map(async (hora) => {
        const disponible = await this.turnosService.verificarDisponibilidad(
          this.especialistaSeleccionado.uid,
          fecha,
          hora
        );
        return disponible ? hora : null; 
      })
    );

    const horariosDisponibles = verificaciones.filter((hora): hora is string => hora !== null);

    this.horariosDisponibles = horariosDisponibles.map(hora => ({
      hora,
      estado: 'disponible' as const
    }));

    console.log('Horarios disponibles:', this.horariosDisponibles);
  }

  get puedeConfirmarTurno(): boolean {
    return !!this.fechaSeleccionada && this.horariosDisponibles.some(h => h.estado === 'disponible');
  }

  getPrimerHorarioDisponible(): string {
    const horario = this.horariosDisponibles.find(h => h.estado === 'disponible');
    return horario ? horario.hora : "";
  }

  async reservarTurno(fecha: string, hora: string) {
    if (!this.especialidadSeleccionada || !this.especialistaSeleccionado || !fecha || !hora) {
      this.toastService.mostrarMensaje('Faltan datos obligatorios para reservar el turno.', 'Reserva de turno', 'error');
      return;
    }
    const disponible = await this.turnosService.verificarDisponibilidad(this.especialistaSeleccionado.uid, fecha, hora);

    if (!disponible) {
      this.toastService.mostrarMensaje('Horario ocupado', 'Ese turno ya fue solicitado.', 'info');
      return;
    }

    const turno: Turno = {
      especialidad: this.especialidadSeleccionada,
      fechaTurno : fecha,
      fechaSolicictado: new Date(),
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
