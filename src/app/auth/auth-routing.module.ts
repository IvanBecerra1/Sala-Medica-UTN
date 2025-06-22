import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { FormRegistroEspecialistaComponent } from './components/form-registro-especialista/form-registro-especialista.component';
import { FormRegistroPacienteComponent } from './components/form-registro-paciente/form-registro-paciente.component';
import { FormRegistroAdminComponent } from './components/form-registro-admin/form-registro-admin.component';
const routes: Routes = [
  { path: 'bienvenida', component: BienvenidaComponent,data: { animation: 'slide' } },
  { path: 'login', component: LoginComponent,data: { animation: 'slide' } },
  { path: 'registro', component: RegistroComponent ,data: { animation: 'slide' }},
  { path: 'registro/especialista', component: FormRegistroEspecialistaComponent ,data: { animation: 'slide' }},
  { path: 'registro/paciente', component: FormRegistroPacienteComponent,data: { animation: 'slide' } },
  { path: 'registro/admin', component: FormRegistroAdminComponent,data: { animation: 'slide' }  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
