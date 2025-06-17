import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  constructor(private firestore: Firestore) {}
  
  obtenerLogs(): Observable<any[]> {
    const ref = collection(this.firestore, 'sala_medica_logs');
    return collectionData(ref, { idField: 'id' }) as Observable<any[]>;
  }
  
  async registrarIngreso(usuario: any) {
    const ref = collection(this.firestore, 'sala_medica_logs');
    const log = {
      uid: usuario.uid,
      email: usuario.email,
      nombre: usuario.nombre || '',
      apellido: usuario.apellido || '',
      rol: usuario.rol || '',
      fecha: new Date()
    };

    await addDoc(ref, log);
  }
}