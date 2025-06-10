import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, collectionData } from '@angular/fire/firestore';
import { Turno } from '../models/turno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(private firestore: Firestore) {}

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
      where('fecha', '==', fecha),
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