import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoColor'
})
export class EstadoColorPipe implements PipeTransform {
  transform(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return '🟡 Pendiente';
      case 'aceptado':
        return '🟢 Aceptado';
      case 'realizado':
        return '👌 Realizado';
      case 'rechazado':
        return '🔴 Rechazado';
      default:
        return estado;
    }
  }
}