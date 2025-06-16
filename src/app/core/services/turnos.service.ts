import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, collectionData, updateDoc, doc, getDoc } from '@angular/fire/firestore';
import { Turno } from '../models/turno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(private firestore: Firestore) {}

  obtenerTodoTurnos(): Observable<Turno[]> {
    const ref = collection(this.firestore, 'sala_medica_turno');
    return collectionData(ref, { idField: 'id' }) as Observable<Turno[]>;
  }

  obtenerTurnosPorEspecialista(uid: string): Observable<Turno[]> {
    const ref = collection(this.firestore, 'sala_medica_turno');
    const q = query(ref, where('especialistaUid', '==', uid));
    return collectionData(q, { idField: 'id' }) as Observable<Turno[]>;
  }

  obtenerTurnosPorPaciente(uid: string): Observable<Turno[]> {
    const ref = collection(this.firestore, 'sala_medica_turno');
    const q = query(ref, where('pacienteUid', '==', uid));
    return collectionData(q, { idField: 'id' }) as Observable<Turno[]>;
  }

  async obtenerMotivoCancelacion(turno: any) {
    const ref = doc(this.firestore, 'sala_medica_turno', turno.id);
    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      const data = snapshot.data();
      return data['comentarioCancelacion'] || 'Sin motivo registrado';
    } else {
      return 'Turno no encontrado';
    }
  }

  async cancelarTurno(turno: any, comentario: string) {
    const ref = doc(this.firestore, 'sala_medica_turno', turno.id);
    await updateDoc(ref, {
      estado: 'cancelado',
      comentarioCancelacion: comentario
    });
  }

  async calificarAtencion(turno: any, comentario: string) {
    const ref = doc(this.firestore, 'sala_medica_turno', turno.id);
    await updateDoc(ref, {
      calificacionPaciente: comentario
    });
  }
   async encuestaAtencion(turno: any, comentario: string) {
    const ref = doc(this.firestore, 'sala_medica_turno', turno.id);
    await updateDoc(ref, {
      encuestaPaciente: comentario
    });
  }

  async actualizarEstado(turno: any, nuevoEstado: string, comentario?: string) {
    const ref = doc(this.firestore, 'sala_medica_turno', turno.id);
    const data: any = { estado: nuevoEstado };

    if (nuevoEstado === 'rechazado' || nuevoEstado.startsWith('cancelado')) {
      data.comentarioCancelacion = comentario;
    } else if (nuevoEstado === 'realizado') {
      data.resenaEspecialista = comentario;
    }

    await updateDoc(ref, data);
  }

  async getTurnosByEspecialistaFecha(uid: string, fecha: string): Promise<any[]> {
    const turnosRef = collection(this.firestore, 'sala_medica_turno');
    const q = query(
      turnosRef,
      where('especialistaUid', '==', uid),
      where('fecha', '==', fecha)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  }

  async guardarTurno(turno: Turno): Promise<void> {
    const turnosRef = collection(this.firestore, 'sala_medica_turno');
    await addDoc(turnosRef, turno);
  }

  async verificarDisponibilidad(especialistaUid: string, fecha: string, hora: string): Promise<boolean> {
    const turnosRef = collection(this.firestore, 'sala_medica_turno');
    const q = query(turnosRef,
      where('especialistaUid', '==', especialistaUid),
      where('fechaTurno', '==', fecha),
      where('hora', '==', hora),
      where('estado', 'in', ['pendiente', 'aceptado'])
    );
    const snapshot = await getDocs(q);
    return snapshot.empty;
  }

  getTurnosByEspecialista(dni?: string, fecha?: string): Observable<Turno[]> {
    const turnosRef = collection(this.firestore, 'turnos');
    const turnosQuery = query(turnosRef, where('especialistaDni', '==', dni), where('fecha', '==', fecha));
    return collectionData(turnosQuery) as Observable<Turno[]>;
  }
}