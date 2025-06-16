import { Component } from '@angular/core';
import { SolicitarTurnoComponent } from "../../components/solicitar-turno/solicitar-turno.component";
import { MisTurnosComponent } from "../../components/mis-turnos/mis-turnos.component";
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home-paciente',
  imports: [SolicitarTurnoComponent, MisTurnosComponent, MaterialModule, NgIf],
  templateUrl: './home-paciente.component.html',
  styleUrl: './home-paciente.component.scss'
})
export class HomePacienteComponent {
  vistaSeleccionada: 'solicitar' | 'ver' = 'solicitar';

  seleccionarVista(vista: 'solicitar' | 'ver') {
    this.vistaSeleccionada = vista;
  }
}
