import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePacienteComponent } from './pages/home-paciente/home-paciente.component';
import { MiPerfilPacienteComponent } from './components/mi-perfil-paciente/mi-perfil-paciente.component';
import { SolicitarTurnoComponent } from './components/solicitar-turno/solicitar-turno.component';
import { PacienteLayoutComponent } from './paciente-layout/paciente-layout.component';
import { animation } from '@angular/animations';
/*
const routes: Routes = [
  { path: '', component:HomePacienteComponent},
  { path: 'perfil', component:MiPerfilPacienteComponent},
  { path: 'solicitar-turno', component:SolicitarTurnoComponent}
];*/
const routes: Routes = [
  {
    path: '',
    component: PacienteLayoutComponent,
    children: [
      { path: '', component:HomePacienteComponent,  data: {animation:'home'} },
      { path: 'perfil', component:MiPerfilPacienteComponent,  data: {animation:'perfil'} },
      { path: 'solicitar-turno', component:SolicitarTurnoComponent, data: {animation: 'turno'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }