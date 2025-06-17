import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { UsuarioService } from '../../../core/services/usuario.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabla-usuarios',
  imports: [MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './tabla-usuarios.component.html',
  styleUrl: './tabla-usuarios.component.scss'
})
export class TablaUsuariosComponent  implements OnInit, OnDestroy{
  usuarios: any[] = [];
  roles: string[] = ['paciente', 'especialista'];
  rolSeleccionado: string = 'especialista';

  usuariosFiltrados: any[] = [];
  columnas: string[] = ['foto', 'nombre', 'dni', 'edad', 'email', 'rol', 'estado', 'acciones'];
  
  private suscripcion!: Subscription;
  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit(): void { 
    this.cargarUsuarios();
  }
  cargarUsuarios() {
   this.suscripcion = this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
      console.log('subcribe');
      console.log(this.usuarios);
      console.log('...................');

      this.filtrarUsuarios('especialista');
    });
  }
  ngOnDestroy() {
    console.log("se salio");
     if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
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
