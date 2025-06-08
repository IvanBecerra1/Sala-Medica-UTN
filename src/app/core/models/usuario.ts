export interface Usuario {
  uid: string;
  nombre: string;
  apellido: string;
  edad: number;
  dni: number;
  mail: string;
  rol: 'paciente' | 'especialista' | 'admin';
  imagen: string[];
}