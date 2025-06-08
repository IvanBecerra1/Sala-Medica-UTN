import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { RegistroAdminComponent } from "../registro-admin/registro-admin.component";
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home-admin',
  imports: [MaterialModule, RegistroAdminComponent, UsuariosComponent, NgIf],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss'
})
export class HomeAdminComponent {

  tipo: 'registrar-usuarios' | 'aceptar-rechazar' | null = null;
}
