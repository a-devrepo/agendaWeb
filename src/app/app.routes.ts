import { Routes } from '@angular/router';
import { CadastrarTarefas } from './components/pages/cadastrar-tarefas/cadastrar-tarefas';
import { ConsultarTarefas } from './components/pages/consultar-tarefas/consultar-tarefas';
import { Dashboard } from './components/pages/dashboard/dashboard';

export const routes: Routes = [
  { path: 'pages', children: [
    { path: 'dashboard', component: Dashboard },
    { path: 'cadastrar-tarefas', component: CadastrarTarefas },
    { path: 'consultar-tarefas', component: ConsultarTarefas },
  ]},
  { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' }
];