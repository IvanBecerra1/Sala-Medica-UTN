import { Component } from '@angular/core';
import { FormRegistroEspecialistaComponent } from "../../components/form-registro-especialista/form-registro-especialista.component";
import { FormRegistroPacienteComponent } from "../../components/form-registro-paciente/form-registro-paciente.component";

import { MatDialog } from '@angular/material/dialog';
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

  constructor(private dialog: MatDialog) {}
  abrirModal(tipo: 'paciente' | 'especialista') {
  if (tipo === 'paciente') {
    this.dialog.open(FormRegistroPacienteComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container'
    });
  } else if (tipo === 'especialista') {
    this.dialog.open(FormRegistroEspecialistaComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container'
    });
  }
}

}
