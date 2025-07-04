import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
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
    

    authState(this.auth).subscribe(async (user) => {
      if (user) {
        await user.reload(); 

        if (user.emailVerified) {
          const ref = doc(this.firestore, 'sala_medica_usuarios', user.uid);
          await updateDoc(ref, { correoVerificado: true });
          console.log('✔ Email verificado actualizado en Firestore');

          const datos = await this.obtenerUsuario(user.uid);
          this.usuarioSubject.next({ ...datos, email: user.email });
        }
        else
        {

          await this.cerrarSesion();

        }
      } else {
        this.usuarioSubject.next(null);
      }
    });
  } 

  async iniciarSesion(email: string, password: string) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      
      if (!user.user.emailVerified) {
        await this.enviarVerificacionEmail(user.user);
      }

      return user;
    } catch (error: any) {
      console.error("Error al iniciar sesión :", error);
      throw error;
    }
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

  async obtenerSesion() : Promise<any>{
    return this.auth.currentUser;
  }

  async cerrarSesion() {

    await signOut(this.auth);
    console.log('sesion Cerrada');
    this.usuarioSubject.next(null);
  }

  // auth.service.ts
  async registrarUsuarioDesdeBackend(datos: any): Promise<any> {
    const guardarData = {
      ...datos,
      correoVerificado: false
    };

    //                            https://backend-push-eii4.onrender.com
    const response = await fetch('https://backend-push-eii4.onrender.com/registrar-paciente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(guardarData)
    });

    /*

Object
error
: 
"The email address is already in use by another account."
mensaje
: 
"Error al registrar usuario"
*/

    if (!response.ok) {
      const errorData = await response.json(); 
      console.error("Detalle del error del backend:", errorData);
      console.log(errorData);

      if (errorData.error === 'The email address is already in use by another account.'){
        errorData.code = 'auth/email-already-in-use';
      }
      throw errorData;
    }

    return await response.json();
  }

  
  async registrarEspecialistaDesdeBackend(datos: any): Promise<any> {
    const guardarData = {
      ...datos,
      correoVerificado: false
    };
    const response = await fetch('https://backend-push-eii4.onrender.com/registrar-especialista', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(guardarData)
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      console.error("Detalle del error del backend:", errorData);
      console.log(errorData);

      if (errorData.error === 'The email address is already in use by another account.'){
        errorData.code = 'auth/email-already-in-use';
      }
      throw errorData;
    }

    return await response.json();
  }

  
  async registrarAdminDesdeBackend(datos: any): Promise<any> {
     const guardarData = {
      ...datos,
      correoVerificado: false
    };
    const response = await fetch('https://backend-push-eii4.onrender.com/registrar-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(guardarData)
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      console.error("Detalle del error del backend:", errorData);
      console.log(errorData);

      if (errorData.error === 'The email address is already in use by another account.'){
        errorData.code = 'auth/email-already-in-use';
      }
      throw errorData;
    }

    return await response.json();
  }

}