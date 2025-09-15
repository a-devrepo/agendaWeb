import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-criar-usuario',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule,
    RouterLink
  ],
  templateUrl: './criar-usuario.html',
  styleUrl: './criar-usuario.css'
})
export class CriarUsuario {

  http = inject(HttpClient);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, ]),
    confirmarSenha: new FormControl('', [Validators.required, ])
  });

  

  onSubmit() {
    if (this.form.valid) {
      console.log('Login enviado:', this.form.value);
    }
  }
}
