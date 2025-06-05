export interface UsuarioEspecialista {
  uid: string;
  nombre: string;
  apellido: string;
  edad: number;
  dni: number;
  email: string;
  especialidades: string[];
  rol: 'especialista';
  aprobado: boolean;
  imagenUrl: string;
}
