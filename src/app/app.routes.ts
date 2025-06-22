import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/bienvenida', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    data: { animation: 'Auth' } 
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: { animation: 'Admin' } 
  },
  {
    path: 'paciente',
    loadChildren: () => import('./paciente/paciente.module').then(m => m.PacienteModule),
    data: { animation: 'Paciente' } 
  },
  {
    path: 'especialista',
    loadChildren: () => import('./especialista/especialista.module').then(m => m.EspecialistaModule),
    data: { animation: 'Especialista' } 
  },
  { path: '**', redirectTo: 'auth/bienvenida' }
];
