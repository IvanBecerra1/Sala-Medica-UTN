import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { RegistroAdminComponent } from './pages/registro-admin/registro-admin.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { MiPerfilAdminComponent } from './components/mi-perfil-admin/mi-perfil-admin.component';

const routes: Routes = [
  { path: '', component:HomeAdminComponent},
  { path: 'lista', component: UsuariosComponent },
  { path: 'registro', component: RegistroAdminComponent},
  { path: 'perfil', component: MiPerfilAdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
