import { Component, inject, signal } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-editar-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Navbar
  ],
  templateUrl: './editar-tarefas.html',
  styleUrl: './editar-tarefas.css'
})
export class EditarTarefas {

  private http = inject(HttpClient);
  notificationService = inject(NotificationService);

  formEdicao!: FormGroup;
  categorias = signal<any[]>([]);
  tarefaId!: number;
  idTarefa = signal('');
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  router = inject(Router);

  ngOnInit(): void {
    this.formEdicao = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(8)]],
      data: ['', Validators.required],
      finalizada: [false],
      prioridade: ['', Validators.required],
      categoriaId: ['', Validators.required]
    });

    this.idTarefa.set(this.route.snapshot.paramMap.get('id') || '');

    this.http.get(environment.apiCategorias).subscribe({
      next: (response) => this.categorias.set(response as any[]),
    });

    this.http.get(`${environment.apiTarefas}/${this.idTarefa()}`).subscribe({
      next: (tarefa) => this.formEdicao.patchValue(tarefa),
    });
  }

  editarTarefa(): void {
    if (this.formEdicao.invalid) return;

    const tarefaAtualizada = this.formEdicao.getRawValue();

    this.http.put(`${environment.apiTarefas}/${this.idTarefa()}`, tarefaAtualizada).subscribe({
      next: () => {
        this.notificationService.showSuccess(`Tarefa atualizada com sucesso`);
      }
    });
  }
}
