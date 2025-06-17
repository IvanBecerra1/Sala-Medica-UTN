import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
 constructor(private firestore: Firestore) {}

  async obtenerTurnosPorDia() {
    const ref = collection(this.firestore, 'sala_medica_turno');
    const snapshot = await getDocs(ref);

    const turnosPorDia: { [fecha: string]: number } = {};

    snapshot.forEach(doc => {
      const data = doc.data();
      const fecha = data['fechaTurno'];

      if (fecha) {
        turnosPorDia[fecha] = (turnosPorDia[fecha] || 0) + 1;
      }
    });

    return Object.entries(turnosPorDia)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([fecha, cantidad]) => ({ fecha, cantidad }));
  }
  
  async obtenerTurnosFinalizadosPorMedico(desde: Date, hasta: Date) {
    const ref = collection(this.firestore, 'sala_medica_turno');
    const snapshot = await getDocs(ref);

    const resultado: { [medico: string]: number } = {};

    snapshot.forEach(doc => {
      const data : any = doc.data();
      const fecha = data.fechaSolicitado?.toDate?.();
      if (!fecha) return;

      if (data.estado === 'realizado' && fecha >= desde && fecha <= hasta) {
        const medico = `${data.especialistaNombre} ${data.especialistaApellido}`;
        resultado[medico] = (resultado[medico] || 0) + 1;
      }
    });

    return Object.entries(resultado).map(([medico, cantidad]) => ({ medico, cantidad }));
  }
  async obtenerTurnosSolicitadosPorMedico(desde: Date, hasta: Date) {
    const ref = collection(this.firestore, 'sala_medica_turno');
    const snapshot = await getDocs(ref);

    const resultado: { [medico: string]: number } = {};

    snapshot.forEach(doc => {
      const data : any = doc.data();
      const fecha = data.fechaSolicitado?.toDate?.();
      if (!fecha) return;

      if (fecha >= desde && fecha <= hasta) {
        const medico = `${data.especialistaNombre} ${data.especialistaApellido}`;
        resultado[medico] = (resultado[medico] || 0) + 1;
      }
    });

    return Object.entries(resultado).map(([medico, cantidad]) => ({ medico, cantidad }));
  }
  
  async estadisticaCantidadTurnosEspecialidad() {
    const ref = collection(this.firestore, 'sala_medica_turno');
    const snapshot = await getDocs(ref);
    const especialidades: { [key: string]: number } = {};
  
    snapshot.forEach(doc => {
      const data = doc.data();
      const especialidad = data['especialidad'];
      if (especialidad) {
        especialidades[especialidad] = (especialidades[especialidad] || 0) + 1;
      }
    });
  
    return Object.entries(especialidades).map(([especialidad, cantidad]) => ({ especialidad, cantidad }));
  }
  
}