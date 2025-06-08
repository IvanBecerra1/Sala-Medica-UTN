import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, collection, query, where, orderBy, snapToData, getDocs, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private firestore: Firestore) {}

  async actualizarEstadoEspecialista(uid: string, estado: boolean) {
    const docRef = doc(this.firestore, 'sala_medica_usuarios', uid);
    await updateDoc(docRef, { aprobado: estado });
  }

  async obtenerUsuario(uid: string): Promise<any> {
    try {
      const documento = doc(this.firestore, "sala_medica_usuarios", uid);
      const snapshot = await getDoc(documento);
      
      if (snapshot.exists()) {
        // Devuelve los datos combinados con el ID del documento
        return {
          id: snapshot.id,
          ...snapshot.data()
        };
      } else {
        console.log("No se encontr el usuario con UID:", uid);
        return null;
      }
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      throw error; 
    }
  }
  async guardarUsuario(uid: string, datos: any) {
    const usuarioDoc = doc(this.firestore, `sala_medica_usuarios/${uid}`);
    await setDoc(usuarioDoc, datos);
  }

  async listarUsuariosPorRol(rol: string): Promise<any[]> {
    const coleccion = collection(this.firestore, 'sala_medica_usuarios');
    const consulta = query(coleccion, where('rol', '==', rol));

    const snapshot = await getDocs(consulta);
    
    const usuarios = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return usuarios;
  }

}