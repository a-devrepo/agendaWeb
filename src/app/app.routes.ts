import { Routes } from '@angular/router';
import { CadastrarTarefas } from './components/pages/cadastrar-tarefas/cadastrar-tarefas';

export const routes: Routes = [
    {
        path:'cadastar-tarefas', component:CadastrarTarefas
    },
    {
      path:'', pathMatch:'full',component:CadastrarTarefas  
    }
];
