import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeEspecialistaComponent } from './pages/home-especialista/home-especialista.component';
import { MiPerfilEspecialistaComponent } from './components/mi-perfil-especialista/mi-perfil-especialista.component';
import { EspecialistaLayoutComponent } from './especialista-layout/especialista-layout.component';
/*
const routes: Routes = [
  { path: '', component:HomeEspecialistaComponent},
  { path: 'perfil', component:MiPerfilEspecialistaComponent},
];*/

const routes: Routes = [
  {
    path: '',
    component: EspecialistaLayoutComponent,
    children: [
      { path: '', component:HomeEspecialistaComponent,  data: {animation:'home'} },
      { path: 'perfil', component:MiPerfilEspecialistaComponent,  data: {animation:'perfil'} },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialistaRoutingModule { }