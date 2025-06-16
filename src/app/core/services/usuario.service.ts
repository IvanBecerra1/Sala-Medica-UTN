import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, collection, query, where, orderBy, snapToData, getDocs, updateDoc, collectionData } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private firestore: Firestore) {}

  async obtenerEspecialidadesUnicas(): Promise<string[]> {
    const ref = collection(this.firestore, 'sala_medica_usuarios');
    const snapshot = await getDocs(ref);

    const especialidadesSet = new Set<string>();

    snapshot.forEach( (doc : any) => {
      const data = doc.data();
      if (data.rol === 'especialista' && Array.isArray(data.especialidades)) {
        data.especialidades.forEach((esp: string) => especialidadesSet.add(esp));
      }
    });

    return Array.from(especialidadesSet).sort(); // Opcional: orden alfabético
  }

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

  async actualizarDisponibilidad(uid: string, disponibilidad: any) {
    const docRef = doc(this.firestore, 'sala_medica_usuarios', uid);
    await updateDoc(docRef, { disponibilidad });
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

    getUsuarios(): Observable<any[]> {
    const usuariosRef = collection(this.firestore, 'sala_medica_usuarios');
    return collectionData(usuariosRef, { idField: 'uid' }).pipe(
      tap(data => console.log('Datos obtenidos de usuarios:', data)) // Muestra los datos en consola
    ) as Observable<any[]>;
  }
}