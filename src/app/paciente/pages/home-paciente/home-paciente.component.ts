import { Component } from '@angular/core';
import { SolicitarTurnoComponent } from "../../components/solicitar-turno/solicitar-turno.component";

@Component({
  selector: 'app-home-paciente',
  imports: [SolicitarTurnoComponent],
  templateUrl: './home-paciente.component.html',
  styleUrl: './home-paciente.component.scss'
})
export class HomePacienteComponent {

}
