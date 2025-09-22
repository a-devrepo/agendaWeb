import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Navbar } from "../../shared/navbar/navbar";
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-cadastrar-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Navbar
  ],
  templateUrl: './cadastrar-tarefas.html',
  styleUrl: './cadastrar-tarefas.css'
})
export class CadastrarTarefas {

  private http = inject(HttpClient);
  notificationService = inject(NotificationService);

  categorias = signal<any[]>([]);
  mensagemErro = signal('');
  mensagemSucesso = signal('');

  ngOnInit() {
    this.http.get(environment.apiCategorias)
      .subscribe(
        {
          next: (response) => {
            this.categorias.set(response as any[]);
          },
          error: (e) => {
            const message = e.error?.message || 'Erro desconhecido do servidor';
            console.error(message);
          }
        }
      )
  }

  formCadastro = new FormGroup(
    {
      nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
      data: new FormControl('', [Validators.required]),
      prioridade: new FormControl('', [Validators.required]),
      categoriaId: new FormControl('', [Validators.required]),
    }
  );

  cadastrarTarefa() {
    const tarefa = this.formCadastro.getRawValue();

    this.http.post(environment.apiTarefas, tarefa)
      .subscribe(
        {
          next: (response) => {
            this.notificationService.showSuccess(`Tarefa ${tarefa.nome} cadastrada com sucesso`);
            this.formCadastro.reset();
          }
        }
      );
  }
}
