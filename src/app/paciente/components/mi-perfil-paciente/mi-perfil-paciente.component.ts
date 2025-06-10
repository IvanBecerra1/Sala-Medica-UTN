import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { AuthService } from '../../../core/services/auth.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-mi-perfil-paciente',
  imports: [MaterialModule, NgIf, NgFor],
  templateUrl: './mi-perfil-paciente.component.html',
  styleUrl: './mi-perfil-paciente.component.scss'
})
export class MiPerfilPacienteComponent implements OnInit {
  usuario: any;

  constructor(private auth: AuthService, private usuarioService: UsuarioService) {}

  async ngOnInit() {
    const currentUser = await this.auth.obtenerSesion();
    if (currentUser) {
      this.usuario = await this.usuarioService.obtenerUsuario(currentUser.uid);
    }
  }
}