import { Injectable } from '@angular/core';
import { TurnosService } from './turnos.service';
import { EncuestaCalificacionService } from './encuesta-calificacion.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialMedicoService {

  constructor(private turno : TurnosService, private resena : EncuestaCalificacionService) { }

  async obtenerHistorialMedico(uid: string): Promise<any[]> {
    const resultado: any[] = [];

    // 1. Obtener turnos del paciente que estén finalizados
    const turnos = await firstValueFrom(this.turno.obtenerTurnosPorPaciente(uid));
    const turnosFinalizados = turnos.filter((t: any) => t.estado === 'realizado');

    for (const turno of turnosFinalizados) {
      if (turno.resenaEspecialista) {
        const resena = await this.resena.obtenerResena(turno.resenaEspecialista);
        resultado.push({
          fechaTurno: turno.fechaTurno,
          nombre: turno.pacienteNombre,
          apellido: turno.pacienteApellido,
          dni: turno.pacienteDni,
          ...resena
        });
      }
    }

    return resultado;
  }
}