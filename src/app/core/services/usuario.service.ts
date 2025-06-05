import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private firestore: Firestore) {}

  async guardarUsuario(uid: string, datos: any) {
    const usuarioDoc = doc(this.firestore, `sala_medica_usuarios/${uid}`);
    await setDoc(usuarioDoc, datos);
  }
}