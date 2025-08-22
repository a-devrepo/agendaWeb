import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

  formCadastro = new FormGroup(
    {
      nome: new FormControl('',[Validators.required, Validators.minLength(8)]),
      data: new FormControl('',[Validators.required]),
      prioridade: new FormControl('',[Validators.required]),
      categoriaId: new FormControl('',[Validators.required]),
    }
  );

  cadastrarTarefa(){
    console.log(this.formCadastro.value);
  }
}
