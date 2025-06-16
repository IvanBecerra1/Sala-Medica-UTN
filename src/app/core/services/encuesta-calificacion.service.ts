import { Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EncuestaCalificacionService {
  constructor(private firestore: Firestore) {}

  async guardarEncuesta(encuesta: any): Promise<string> {
    const ref = collection(this.firestore, 'sala_medica_encuestas');
    const docRef = await addDoc(ref, encuesta);
    return docRef.id;
  }

  async guardarCalificacion(calificacion: any): Promise<string> {
    const ref = collection(this.firestore, 'sala_medica_calificaciones');
    const docRef = await addDoc(ref, calificacion);
    return docRef.id;
  }

  async guardarResena(resena: any): Promise<string> {
    const ref = collection(this.firestore, 'sala_medica_resena');
    const docRef = await addDoc(ref, resena);

    const id = docRef.id;
    console.log("id resena servicio" + id);
    return id;
  }

  async obtenerEncuesta(id: string): Promise<any | null> {
    const docRef = doc(this.firestore, 'sala_medica_encuestas', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as any) : null;
  }

  
  async obtenerResena(id: string): Promise<any | null> {
    const docRef = doc(this.firestore, 'sala_medica_resena', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as any) : null;
  }

  async obtenerCalificacion(id: string): Promise<any | null> {
    console.log("id calificacion");
    console.log(id);
    const docRef = doc(this.firestore, 'sala_medica_calificaciones', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as any) : null;
  }
}