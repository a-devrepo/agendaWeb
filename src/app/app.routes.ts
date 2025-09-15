import { Routes } from '@angular/router';
import { CadastrarTarefas } from './components/pages/cadastrar-tarefas/cadastrar-tarefas';
import { ConsultarTarefas } from './components/pages/consultar-tarefas/consultar-tarefas';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { CriarUsuario } from './components/pages/criar-usuario/criar-usuario';
import { AutenticarUsuario } from './components/pages/autenticar-usuario/autenticar-usuario';

export const routes: Routes = [
  { path: 'pages', children: [
    { path: 'dashboard', component: Dashboard },
    { path: 'cadastrar-tarefas', component: CadastrarTarefas },
    { path: 'consultar-tarefas', component: ConsultarTarefas },
    { path: 'criar-usuario', component: CriarUsuario },
    { path: 'autenticar-usuario', component: AutenticarUsuario },
  ]},
  { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' }
];