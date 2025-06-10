export interface Turno {
  especialidad: string;
  fecha: string;
  hora: string;
  estado: 'pendiente' | 'aceptado' | 'rechazado' | 'atendido';

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
