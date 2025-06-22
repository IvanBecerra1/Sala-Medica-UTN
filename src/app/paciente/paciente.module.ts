import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteLayoutComponent } from './paciente-layout/paciente-layout.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    PacienteLayoutComponent
  ]
})
export class PacienteModule { }
