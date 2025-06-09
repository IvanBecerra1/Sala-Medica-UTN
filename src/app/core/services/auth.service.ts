import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { authState } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly emailKey = 'admin_email';
  private readonly passwordKey = 'admin_password';

  private usuarioSubject = new BehaviorSubject<any>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private auth: Auth, private firestore: Firestore) {
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
  
  guardar(email: string, password: string) {
    localStorage.setItem(this.emailKey, email);
    localStorage.setItem(this.passwordKey, password);

    console.log("datos localstorage");
    console.log(email);
    console.log(password);
  } 

  
  obtener(): { email: string, password: string } | null {
    const email = localStorage.getItem(this.emailKey);
    const password = localStorage.getItem(this.passwordKey);

    if (email && password) {
      return { email, password };
    }

    return null;
  }

  limpiar() {
    localStorage.removeItem(this.emailKey);
    localStorage.removeItem(this.passwordKey);
  }
  async iniciarSesion(email : string, password : string) {
    const user = await signInWithEmailAndPassword(this.auth, email, password);
    
    if (user.user.emailVerified == false){
      await this.enviarVerificacionEmail(user.user)
      console.log("SE ENVIO EL CORREO PARA VERIFICAR");
    }
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

  // auth.service.ts
  async registrarUsuarioDesdeBackend(datos: any): Promise<any> {
    const response = await fetch('https://backend-push-eii4.onrender.com/registrar-paciente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });

    if (!response.ok) {
      const errorData = await response.json();  // <- acá se obtiene el JSON de error
      console.error("Detalle del error del backend:", errorData);
      throw new Error(`Error al registrar usuario: ${errorData.mensaje || 'desconocido'}`);
    }

    return await response.json();
  }

  
  async registrarEspecialistaDesdeBackend(datos: any): Promise<any> {
    const response = await fetch('https://backend-push-eii4.onrender.com/registrar-especialista', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });

    if (!response.ok) {
      const errorData = await response.json();  // <- acá se obtiene el JSON de error
      console.error("Detalle del error del backend:", errorData);
      throw new Error(`Error al registrar usuario: ${errorData.mensaje || 'desconocido'}`);
    }

    return await response.json();
  }

  
  async registrarAdminDesdeBackend(datos: any): Promise<any> {
    const response = await fetch('https://backend-push-eii4.onrender.com/registrar-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });

    if (!response.ok) {
      const errorData = await response.json();  // <- acá se obtiene el JSON de error
      console.error("Detalle del error del backend:", errorData);
      throw new Error(`Error al registrar usuario: ${errorData.mensaje || 'desconocido'}`);
    }

    return await response.json();
  }

}