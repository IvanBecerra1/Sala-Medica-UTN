import { Component } from '@angular/core';
import { TurnosEspecialistaComponent } from "../../components/turnos-especialista/turnos-especialista.component";
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { MisPacientesComponent } from "../../components/mis-pacientes/mis-pacientes.component";

@Component({
  selector: 'app-home-especialista',
  imports: [TurnosEspecialistaComponent, MaterialModule, NgIf, MisPacientesComponent],
  templateUrl: './home-especialista.component.html',
  styleUrl: './home-especialista.component.scss'
})
export class HomeEspecialistaComponent {
  vistaSeleccionada: 'solicitar' | 'ver' = 'solicitar';

  seleccionarVista(vista: 'solicitar' | 'ver') {
    this.vistaSeleccionada = vista;
  }
}
