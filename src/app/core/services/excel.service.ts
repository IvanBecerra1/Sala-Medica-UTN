import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  exportarTurnoUsuario(turno : any[]){
     const datosFiltrados = turno.map(turno => {
      const copia = { ...turno };
      delete copia.uid;
      delete copia.id
      delete copia.encuestaPaciente
      delete copia.calificacionPaciente
      delete copia.fechaSolicictado
      delete copia.especialistaUid
      delete copia.pacienteUid
      delete copia.resenaEspecialista
      return copia;
    });

    const hoja = XLSX.utils.json_to_sheet(datosFiltrados);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Usuarios-Turno');

    XLSX.writeFile(libro, 'paciente_turno.xlsx');
  }

  exportarUsuarios(usuarios: any[]): void {

    const datosFiltrados = usuarios.map(usuario => {
      const copia = { ...usuario };
      delete copia.uid;
      delete copia.imagenUrl;
      delete copia.imagen2Url;
      delete copia.disponibilidad;
      delete copia.id;
      delete copia.especialidades;
      delete copia.aprobado
      return copia;
    });

    const hoja = XLSX.utils.json_to_sheet(datosFiltrados);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Usuarios');

    XLSX.writeFile(libro, 'usuarios_general.xlsx');
  }
}