import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Navbar } from "../../shared/navbar/navbar";
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-consultar-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Navbar
],
  templateUrl: './consultar-tarefas.html',
  styleUrl: './consultar-tarefas.css'
})
export class ConsultarTarefas {

  notificationService = inject(NotificationService);
  private http = inject(HttpClient);

  tarefas = signal<any[]>([]);

  formConsulta = new FormGroup(
    {
      dataMin: new FormControl('', [Validators.required]),
      dataMax: new FormControl('', [Validators.required]),
    }
  );

  consultarTarefas() {
    const dataMin = this.formConsulta.value.dataMin;
    const dataMax = this.formConsulta.value.dataMax;

    this.http.get(`${environment.apiTarefas}/${dataMin}/${dataMax}`)
      .subscribe(
        {
          next: (response) => {
            this.tarefas.set(response as any[]);
          },
          error: (e) => {
            console.log(e);
          }
        })
  }

  excluirTarefa(id: string) {

    if (confirm('Deseja realmente excluir a tarefa selecionada?')) {
      this.http.delete(`${environment.apiTarefas}/${id}`, { responseType: 'text' })
        .subscribe(
          {
            next: (response) => {
              this.notificationService.showSuccess('Tarefa excluída com sucesso');
              this.consultarTarefas();
            }
          })
    }
  }
}
