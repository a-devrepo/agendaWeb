import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule,Validators, FormGroup, FormControl } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    RouterLink,
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    RouterModule],
  templateUrl: './autenticar-usuario.html',
  styleUrl: './autenticar-usuario.css'
})
export class AutenticarUsuario {

  http = inject(HttpClient);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  

  onSubmit() {
    if (this.form.valid) {

    this.http.post(environment.apiUsuarios + '/autenticar', this.form.value)
    .subscribe({ 
      next: (data) => { console.log(data); }, 
      error: (e) => { console.log(e.error); } 
    });
    }
  }
}