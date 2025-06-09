import { Component } from '@angular/core';
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
export class TablaUsuariosComponent {
  usuarios: any[] = [];
  roles: string[] = ['paciente', 'especialista'];
  rolSeleccionado: string = 'especialista';

  columnas: string[] = ['foto', 'nombre', 'dni', 'edad', 'email', 'rol', 'estado', 'acciones'];
  
  constructor(private usuarioService: UsuarioService) {
    this.listar();
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
