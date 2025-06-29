import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { RegistroAdminComponent } from "../registro-admin/registro-admin.component";
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { NgIf } from '@angular/common';
import { TurnosAdminComponent } from "../../components/turnos-admin/turnos-admin.component";
import { SolicitarTurnoAdminComponent } from "../../components/solicitar-turno-admin/solicitar-turno-admin.component";
import { TodoUsuariosComponent } from "../../components/todo-usuarios/todo-usuarios.component";
import { GraficosComponent } from "../../../shared/components/graficos/graficos.component";
import { ResaltarElementoDirective } from '../../../core/directivas/resaltar-elemento.directive';

@Component({
  selector: 'app-home-admin',
  imports: [MaterialModule, RegistroAdminComponent, UsuariosComponent, NgIf, TurnosAdminComponent, 
    SolicitarTurnoAdminComponent, TodoUsuariosComponent,
     GraficosComponent, ResaltarElementoDirective],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss'
})
export class HomeAdminComponent {

  tipo: 'registrar-usuarios' | 'aceptar-rechazar' | 'listado'|'turnos' |'usuarios' | 'estadistica'| null = null;
}
