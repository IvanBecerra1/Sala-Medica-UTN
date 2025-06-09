import { Component } from '@angular/core';
import { FormRegistroEspecialistaComponent } from "../../../auth/components/form-registro-especialista/form-registro-especialista.component";
import { FormRegistroPacienteComponent } from "../../../auth/components/form-registro-paciente/form-registro-paciente.component";
import { FormRegistroAdminComponent } from "../../../auth/components/form-registro-admin/form-registro-admin.component";
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registro-admin',
  imports: [FormRegistroEspecialistaComponent, 
    FormRegistroPacienteComponent, 
    FormRegistroAdminComponent, MaterialModule, NgIf],
  templateUrl: './registro-admin.component.html',
  styleUrl: './registro-admin.component.scss'
})
export class RegistroAdminComponent {
  tipo: 'paciente' | 'especialista' |'admin' | null = null;

  constructor(private dialog: MatDialog) {}
  abrirModal(tipo: 'paciente' | 'especialista' | 'admin') {
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
  } else if (tipo === 'admin') {
    this.dialog.open(FormRegistroAdminComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container'
    });
  }
}

}
