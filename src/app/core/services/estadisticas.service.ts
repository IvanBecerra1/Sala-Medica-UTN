import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
 constructor(private firestore: Firestore) {}

 
  async obtenerLogDeIngresos() {
    const ref = collection(this.firestore, 'sala_medica_logs');
    const snapshot = await getDocs(ref);

    const logsPorDiaYUsuario: { [dia: string]: { [usuario: string]: number } } = {};

    snapshot.forEach(doc => {
      const data = doc.data();
      const timestamp = data['fecha'];
      const nombre = data['nombre'];
      const apellido = data['apellido'];

      if (timestamp && nombre && apellido) {
        const fecha = timestamp.toDate(); // timestamp → Date
        const dia = fecha.toISOString().split('T')[0]; // YYYY-MM-DD
        const usuario = `${nombre} ${apellido}`;

        logsPorDiaYUsuario[dia] = logsPorDiaYUsuario[dia] || {};
        logsPorDiaYUsuario[dia][usuario] = (logsPorDiaYUsuario[dia][usuario] || 0) + 1;
      }
    });

    return logsPorDiaYUsuario;
  }

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
    /*  const data : any = doc.data();
      const fecha = data.fechaSolicitado?.toDate?.();
      if (!fecha) return;*/
      
      const data: any = doc.data();
      const fechaStr = data.fechaTurno;
      const fecha = fechaStr ? new Date(fechaStr) : null;
      
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
      const data: any = doc.data();
      const fechaStr = data.fechaTurno;
      const fecha = fechaStr ? new Date(fechaStr) : null;

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