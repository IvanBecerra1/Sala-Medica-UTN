export interface Turno {
  especialidad: string;
  fechaTurno: string;
  fechaSolicictado: any;
  hora: string;
  estado: 'pendiente' | 'cancelado' | 'aceptado' | 'rechazado' | 'atendido' | 'realizado';

  especialistaUid: string;
  especialistaNombre: string;
  especialistaApellido: string;
  especialistaDni: string;

  pacienteUid: string;
  pacienteNombre: string;
  pacienteApellido: string;
  pacienteDni: string;
  obraSocial: string;

  calificacion?: string;
  resenia?: string;
  datosAtencion?: {
    presion?: string;
    altura?: string;
    peso?: string;
    temperatura?: string;
  };
}
