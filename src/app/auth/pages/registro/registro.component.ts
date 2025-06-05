import { Component } from '@angular/core';
import { FormRegistroEspecialistaComponent } from "../../components/form-registro-especialista/form-registro-especialista.component";
import { FormRegistroPacienteComponent } from "../../components/form-registro-paciente/form-registro-paciente.component";

import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
@Component({
  selector: 'app-registro',
  imports: [FormRegistroEspecialistaComponent, FormRegistroPacienteComponent, CommonModule, MaterialModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  tipo: 'paciente' | 'especialista' | null = null;
}
