import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.DashboardComponent),
  },
  {
    path: 'pipelines',
    loadComponent: () => import('./pages/pipelines/pipelines').then((m) => m.PipelinesComponent),
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services').then((m) => m.ServicesComponent),
  },
  {
    path: 'demo-guide',
    loadComponent: () => import('./pages/demo-guide/demo-guide').then((m) => m.DemoGuideComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
