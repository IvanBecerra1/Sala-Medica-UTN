import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { MaterialModule } from '../../../material.module';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
@Component({
  selector: 'app-mi-perfil-especialista',
  imports: [MaterialModule, NgIf, NgFor, FormsModule],
  templateUrl: './mi-perfil-especialista.component.html',
  styleUrl: './mi-perfil-especialista.component.scss'
})
export class MiPerfilEspecialistaComponent {
  usuario: any;
  uid!: string;

  diasDisponibles = [
    { nombre: 'Lunes', seleccionado: false },
    { nombre: 'Martes', seleccionado: false },
    { nombre: 'Miercoles', seleccionado: false },
    { nombre: 'Jueves', seleccionado: false },
    { nombre: 'Viernes', seleccionado: false },
    { nombre: 'Sabado', seleccionado: false }
  ];

  franjasHorarias = [
    { nombre: '9:00 a 13:00', seleccionado: false },
    { nombre: '14:00 a 18:00', seleccionado: false },
    { nombre: '18:00 a 21:00', seleccionado: false }
  ];


  constructor(private auth: AuthService, private toast : ToastService,private usuarioService: UsuarioService) {}

  async ngOnInit() {
    const currentUser = await this.auth.obtenerSesion();
    if (currentUser) {
      this.usuario = await this.usuarioService.obtenerUsuario(currentUser.uid);

       if (this.usuario?.disponibilidad) {
        this.diasDisponibles.forEach(d => d.seleccionado = this.usuario.disponibilidad.dias.includes(d.nombre));
        this.franjasHorarias.forEach(h => h.seleccionado = this.usuario.disponibilidad.horarios.includes(h.nombre));
      }
    }
  }

  
  async guardar() {
    const dias = this.diasDisponibles.filter(d => d.seleccionado).map(d => d.nombre);
    const horarios = this.franjasHorarias.filter(h => h.seleccionado).map(h => h.nombre);

    const disponibilidad = { dias, horarios };

    await this.usuarioService.actualizarDisponibilidad(this.usuario.uid, disponibilidad);
    this.toast.mostrarMensaje('Datos actualizados', 'Mi perfil especialista', 'success');
  }
}