import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePacienteComponent } from './pages/home-paciente/home-paciente.component';
import { MiPerfilPacienteComponent } from './components/mi-perfil-paciente/mi-perfil-paciente.component';

const routes: Routes = [
  { path: '', component:HomePacienteComponent},
  { path: 'perfil', component:MiPerfilPacienteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }