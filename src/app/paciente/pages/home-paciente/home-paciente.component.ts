import { Component } from '@angular/core';
import { SolicitarTurnoComponent } from "../../components/solicitar-turno/solicitar-turno.component";
import { MisTurnosComponent } from "../../components/mis-turnos/mis-turnos.component";
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { ResaltarElementoDirective } from '../../../core/directivas/resaltar-elemento.directive';

@Component({
  selector: 'app-home-paciente',
  imports: [SolicitarTurnoComponent, MisTurnosComponent, MaterialModule, NgIf, ResaltarElementoDirective],
  templateUrl: './home-paciente.component.html',
  styleUrl: './home-paciente.component.scss'
})
export class HomePacienteComponent {
  vistaSeleccionada: 'solicitar' | 'ver' = 'solicitar';

  seleccionarVista(vista: 'solicitar' | 'ver') {
    this.vistaSeleccionada = vista;
  }
}
