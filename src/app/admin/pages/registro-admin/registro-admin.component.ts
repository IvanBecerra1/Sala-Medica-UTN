import { Component } from '@angular/core';
import { FormRegistroEspecialistaComponent } from "../../../auth/components/form-registro-especialista/form-registro-especialista.component";
import { FormRegistroPacienteComponent } from "../../../auth/components/form-registro-paciente/form-registro-paciente.component";
import { FormRegistroAdminComponent } from "../../../auth/components/form-registro-admin/form-registro-admin.component";
import { MaterialModule } from '../../../material.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registro-admin',
  imports: [FormRegistroEspecialistaComponent, 
    FormRegistroPacienteComponent, 
    FormRegistroAdminComponent, MaterialModule, NgIf],
  templateUrl: './registro-admin.component.html',
  styleUrl: './registro-admin.component.scss'
})
export class RegistroAdminComponent {

  tipo: 'paciente' | 'especialista' | 'admin' |null = null;
}
