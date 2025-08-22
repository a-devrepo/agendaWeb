import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-tarefas',
  imports: [
    CommonModule
  ],
  templateUrl: './cadastrar-tarefas.html',
  styleUrl: './cadastrar-tarefas.css'
})
export class CadastrarTarefas {

  formCadastro = new FormGroup(
    {
      nome: new FormControl(''),
      data: new FormControl(''),
      prioridade: new FormControl(''),
      categoriaId: new FormControl('')
    }
  );

  cadastrarTarefa(){
    console.log(this.formCadastro.value);
  }
}
