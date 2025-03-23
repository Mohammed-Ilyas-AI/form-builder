import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./app.component').then(m => m.AppComponent) },
  { path: 'left-pane', loadComponent: () => import('./components/left-pane/left-pane.component').then(m => m.LeftPaneComponent) },
  { path: 'middle-pane', loadComponent: () => import('./components/middle-pane/middle-pane.component').then(m => m.MiddlePaneComponent) },
  { path: 'right-pane', loadComponent: () => import('./components/right-pane/right-pane.component').then(m => m.RightPaneComponent) },
];
