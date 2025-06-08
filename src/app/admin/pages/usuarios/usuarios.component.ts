import { Component } from '@angular/core';
import { TablaUsuariosComponent } from "../../components/tabla-usuarios/tabla-usuarios.component";

@Component({
  selector: 'app-usuarios',
  imports: [TablaUsuariosComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

}
