import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { RegistroAdminComponent } from './pages/registro-admin/registro-admin.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { MiPerfilAdminComponent } from './components/mi-perfil-admin/mi-perfil-admin.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { GraficosComponent } from '../shared/components/graficos/graficos.component';
import { EstadisticaComponent } from './components/estadistica/estadistica.component';

/*
const routes: Routes = [
  { path: '', component:HomeAdminComponent},
  { path: 'lista', component: UsuariosComponent },
  { path: 'registro', component: RegistroAdminComponent},
  { path: 'perfil', component: MiPerfilAdminComponent}
];*/
const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {path: '', component:HomeAdminComponent, data: {animation:'home'} },
      { path: 'lista', component: UsuariosComponent, data: { animation: 'lista' } },
      { path: 'estadistica', component: EstadisticaComponent, data: { animation: 'estadistica' } },
      { path: 'registro', component: RegistroAdminComponent, data: { animation: 'registro' }},
      { path: 'perfil', component: MiPerfilAdminComponent, data: { animation: 'perfil' }}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
