import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatearDni',
  standalone: true
})
export class FormatearDniPipe implements PipeTransform {
  transform(dni: string | number): string {
    const limpio = dni.toString().replace(/\D/g, ''); 

    if (limpio.length !== 8) return dni.toString(); 

    // Insertar puntos: 32.323.232
    return limpio.replace(/^(\d{2})(\d{3})(\d{3})$/, '$1.$2.$3');
  }
}
