import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { FormRegistroEspecialistaComponent } from './components/form-registro-especialista/form-registro-especialista.component';
import { FormRegistroPacienteComponent } from './components/form-registro-paciente/form-registro-paciente.component';
import { FormRegistroAdminComponent } from './components/form-registro-admin/form-registro-admin.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

/*const routes: Routes = [
  { path: 'bienvenida', component: BienvenidaComponent},
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'registro/especialista', component: FormRegistroEspecialistaComponent },
  { path: 'registro/paciente', component: FormRegistroPacienteComponent },
  { path: 'registro/admin', component: FormRegistroAdminComponent  },
  

];*/
const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'bienvenida', component: BienvenidaComponent, data: { animation: 'Bienvenida' } },
      { path: 'login', component: LoginComponent, data: { animation: 'Login' } },
      { path: 'registro', component: RegistroComponent, data: { animation: 'Registro' } },
      { path: 'registro/especialista', component: FormRegistroEspecialistaComponent, data: { animation: 'RegistroEsp' } },
      { path: 'registro/paciente', component: FormRegistroPacienteComponent, data: { animation: 'RegistroPac' } },
      { path: 'registro/admin', component: FormRegistroAdminComponent, data: { animation: 'RegistroAdmin' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
