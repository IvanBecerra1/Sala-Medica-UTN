import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { authState } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioSubject = new BehaviorSubject<any>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private auth: Auth, private firestore: Firestore) {
    this.auth.languageCode = 'es';
    this.auth.languageCode = 'es';

    authState(this.auth).subscribe(async (user) => {
      if (user) {
        const datos = await this.obtenerUsuario(user.uid);
        this.usuarioSubject.next({ ...datos, email: user.email });
      } else {
        this.usuarioSubject.next(null);
      }
    });
  } 
  async iniciarSesion(email : string, password : string) {
    const user = await signInWithEmailAndPassword(this.auth, email, password);
    return user;
  }

  async registrarUsuario(email: string, password: string) {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    return cred.user;
  }

  async enviarVerificacionEmail(user: any) {
    await sendEmailVerification(user);
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

  async obtenerSesion() : Promise<User | null>{
    return this.auth.currentUser;
  }

  async cerrarSesion() {
    await signOut(this.auth);
    this.usuarioSubject.next(null);
  }
}