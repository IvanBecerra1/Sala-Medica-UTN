import { Component } from '@angular/core';
import { FormRegistroEspecialistaComponent } from "../../components/form-registro-especialista/form-registro-especialista.component";
import { FormRegistroPacienteComponent } from "../../components/form-registro-paciente/form-registro-paciente.component";

import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  imports: [CommonModule, MaterialModule, FormRegistroEspecialistaComponent, FormRegistroPacienteComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  tipo: 'paciente' | 'especialista' | null = null;

  constructor(private router : Router) {}
  abrirModal(tipo: 'paciente' | 'especialista') {
    let url = "auth/registro/" + tipo;
    this.router.navigateByUrl(url);
  }

}
