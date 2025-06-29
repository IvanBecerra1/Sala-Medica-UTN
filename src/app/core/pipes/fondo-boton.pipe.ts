import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fondoBoton',
  standalone: true
})
export class FondoBotonPipe implements PipeTransform {
  transform(accion: string): string {
    switch (accion.toLowerCase()) {
      case 'cancelar':
        return '#ef5350'; // rojo claro
      case 'motivo':
        return '#ffee58'; // amarillo
      case 'completar encuesta':
        return '#4fc3f7'; // celeste
      case 'calificar atención':
        return '#81c784'; // verde claro
      case 'ver reseña':
        return '#ba68c8'; // violeta
      default:
        return '#e0e0e0'; // gris claro
    }
  }
}