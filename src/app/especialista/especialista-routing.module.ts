import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeEspecialistaComponent } from './pages/home-especialista/home-especialista.component';
import { MiPerfilEspecialistaComponent } from './components/mi-perfil-especialista/mi-perfil-especialista.component';

const routes: Routes = [
  { path: '', component:HomeEspecialistaComponent},
  { path: 'perfil', component:MiPerfilEspecialistaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialistaRoutingModule { }