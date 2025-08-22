import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-tarefas.html',
  styleUrl: './cadastrar-tarefas.css'
})
export class CadastrarTarefas {

  private http = inject(HttpClient);

  categorias = signal<any[]>([]);

  ngOnInit(){
    this.http.get('http://localhost:8082/api/v1/categorias')
    .subscribe(
      {
        next:(response) =>{
          this.categorias.set(response as any[]);
        },
        error:(e) =>{
          console.error(`Erro ao carregar categorias: ${e}`);
        }
      }
    )
  }

  formCadastro = new FormGroup(
    {
      nome: new FormControl('',[Validators.required, Validators.minLength(8)]),
      data: new FormControl('',[Validators.required]),
      prioridade: new FormControl('',[Validators.required]),
      categoriaId: new FormControl('',[Validators.required]),
    }
  );

  cadastrarTarefa(){
    console.log(this.formCadastro.getRawValue());
    this.formCadastro.reset();
  }
}
