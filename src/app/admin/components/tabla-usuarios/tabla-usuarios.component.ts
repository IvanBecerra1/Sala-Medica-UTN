import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { UsuarioService } from '../../../core/services/usuario.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-usuarios',
  imports: [MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './tabla-usuarios.component.html',
  styleUrl: './tabla-usuarios.component.scss'
})
export class TablaUsuariosComponent  implements OnInit{
  usuarios: any[] = [];
  roles: string[] = ['paciente', 'especialista'];
  rolSeleccionado: string = 'especialista';

  usuariosFiltrados: any[] = [];
  columnas: string[] = ['foto', 'nombre', 'dni', 'edad', 'email', 'rol', 'estado', 'acciones'];
  
  constructor(private usuarioService: UsuarioService) {
    this.listar();
  }
  ngOnInit(): void { 
    this.cargarUsuarios();
  }
  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
      this.filtrarUsuarios('especialista');
    });
  }

  
  filtrarUsuarios(rol: string) {
    this.rolSeleccionado = rol;

    switch (rol) {
      case 'paciente':
        this.columnas = ['foto', 'nombre', 'dni', 'edad', 'email', 'rol'];
        this.usuariosFiltrados = this.usuarios.filter(u => u.rol === 'paciente');
        break;
      case 'especialista':
        this.columnas = ['foto', 'nombre', 'dni', 'edad', 'email', 'rol', 'estado', 'acciones'];
        this.usuariosFiltrados = this.usuarios.filter(u => u.rol === 'especialista');
        break;
      default:
        this.columnas = ['foto', 'nombre', 'dni', 'edad', 'email', 'rol', 'estado', 'acciones'];
        this.usuariosFiltrados = this.usuarios;
        break;
    }
  }
  async listar() {
    this.usuarios = await this.usuarioService.listarUsuariosPorRol(this.rolSeleccionado);
  }

  async toggleEstado(usuario: any) {
    const nuevoEstado = !usuario.aprobado;
    await this.usuarioService.actualizarEstadoEspecialista(usuario.uid, nuevoEstado);
    usuario.aprobado = nuevoEstado;
  }
}
