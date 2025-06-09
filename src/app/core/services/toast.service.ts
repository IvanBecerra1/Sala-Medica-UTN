import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  mostrarMensaje(mensaje: string, tipo: 'success' | 'error' | 'info' = 'info', duracion: number = 3000) {
    const config: MatSnackBarConfig = {
      duration: duracion,
      horizontalPosition: 'center',
      verticalPosition: 'top',
   panelClass: 'toast-success',
    };

    this.snackBar.open(mensaje, 'Cerrar', config);
  }

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
