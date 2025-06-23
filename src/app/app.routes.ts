import { Routes } from '@angular/router';
import { GraficosComponent } from './shared/components/graficos/graficos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/bienvenida', pathMatch: 'full' },
  {
    path: 'auth',
    data: { animation: 'LoginPage' },
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'admin',
    data: { animation: 'HomePage' },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'paciente',
    data: { animation: 'HomePage' },
    loadChildren: () => import('./paciente/paciente.module').then(m => m.PacienteModule),
  },
  {
    path: 'especialista',
    data: { animation: 'HomePage' },
    loadChildren: () => import('./especialista/especialista.module').then(m => m.EspecialistaModule),
  },
  {
    path: 'estadistica',
    component:GraficosComponent
  },
  { path: '**', redirectTo: 'auth/bienvenida' }
];
