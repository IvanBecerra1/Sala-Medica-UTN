import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { EAutenticacion } from '../enum/Eautenticacion';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  mostrarMensaje(mensaje: string, titulo : string, tipo: 'success' | 'error' | 'info' = 'info') {
    switch (tipo){
      case "success": { 
        this.toastr.success(mensaje, titulo);
        break;
      }
      case "error": {
        this.toastr.error(mensaje, titulo);
        break;
      }
      case "info" : {
        this.toastr.info(mensaje, titulo);
        break;
      }
    }
  }

  public mensajeErrorRegistro(error: any) {
    // MAPS CLAVE VALOR
    const mensajesError = new Map<string, EAutenticacion>([
      ["auth/email-already-in-use", EAutenticacion.CORREO_EN_USO],
      ["auth/weak-password", EAutenticacion.CLAVE_INVALIDO],
      ["auth/invalid-email", EAutenticacion.CORREO_INVALIDO],
      ["auth/missing-email", EAutenticacion.CAMPO_CORREO_VACIO],
      ["auth/missing-password", EAutenticacion.CAMPO_CLAVE_VACIO],
      ["auth/admin-restricted-operation", EAutenticacion.CAMPOS_VACIOS],
      ["auth/too-many-requests", EAutenticacion.MUCHOS_INTENTOS],
      ['auth/user-not-found', EAutenticacion.USUARIO_NO_ENCONTRADO],
      ["auth/wrong-password", EAutenticacion.CONTRASENA_INVALIDO],
      ['auth/invalid-credential', EAutenticacion.CREDENCIALES_INVALIDAS]
    ]);

    const mensaje = mensajesError.get(error.code) || EAutenticacion.ERROR_DESCONOCIDO;
    this.mostrarTastr(false, mensaje);
  
    console.error("(Registro.Component.ts): Error en el registro:", error.code);
    console.error("(Registro.Component.ts): Detalles del error:", JSON.stringify(error));
  }
  
  private mostrarTastr(exito : boolean, texto : string){
    exito ? 
      this.toastr.success(texto, EAutenticacion.REGISTRO_TITULO)
    : 
      this.toastr.error(texto, EAutenticacion.REGISTRO_TITULO);

  }
  /*
  mostrarMensaje(mensaje: string, tipo: 'success' | 'error' | 'info' = 'info', duracion: number = 3000) {
    const config: MatSnackBarConfig = {
      duration: duracion,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'toast-success',
    };

    this.snackBar.open(mensaje, 'Cerrar', config);
  }*/

  private obtenerClase(tipo: string): string[] {
    switch (tipo) {
      case 'success':
        return ['toast-success'];
      case 'error':
        return ['toast-error'];
      case 'info':
      default:
        return ['toast-info'];
    }
  }
}
