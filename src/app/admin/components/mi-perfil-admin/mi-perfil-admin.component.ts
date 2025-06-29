import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { MaterialModule } from '../../../material.module';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormatearDniPipe } from '../../../core/pipes/formatear-dni.pipe';

@Component({
  selector: 'app-mi-perfil-admin',
  imports: [MaterialModule, NgIf, NgFor, FormsModule, FormatearDniPipe],
  templateUrl: './mi-perfil-admin.component.html',
  styleUrl: './mi-perfil-admin.component.scss'
})
export class MiPerfilAdminComponent {
  usuario: any;

  constructor(private auth: AuthService, private usuarioService: UsuarioService) {}

  async ngOnInit() {
    const currentUser = await this.auth.obtenerSesion();
    if (currentUser) {
      this.usuario = await this.usuarioService.obtenerUsuario(currentUser.uid);
    }
  }
}