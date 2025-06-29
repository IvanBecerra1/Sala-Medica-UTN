import { Component } from '@angular/core';
import { TurnosEspecialistaComponent } from "../../components/turnos-especialista/turnos-especialista.component";
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { MisPacientesComponent } from "../../components/mis-pacientes/mis-pacientes.component";
import { ResaltarElementoDirective } from '../../../core/directivas/resaltar-elemento.directive';

@Component({
  selector: 'app-home-especialista',
  imports: [TurnosEspecialistaComponent,ResaltarElementoDirective, MaterialModule, NgIf, MisPacientesComponent],
  templateUrl: './home-especialista.component.html',
  styleUrl: './home-especialista.component.scss'
})
export class HomeEspecialistaComponent {
  vistaSeleccionada: 'solicitar' | 'ver' = 'solicitar';

  seleccionarVista(vista: 'solicitar' | 'ver') {
    this.vistaSeleccionada = vista;
  }
}
