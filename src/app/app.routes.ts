import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/bienvenida', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'paciente',
    loadChildren: () => import('./paciente/paciente.module').then(m => m.PacienteModule)
  },
  {
    path: 'especialista',
    loadChildren: () => import('./especialista/especialista.module').then(m => m.EspecialistaModule)
  },
  { path: '**', redirectTo: 'auth/bienvenida' }
];
