import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule,Validators, FormGroup, FormControl } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../services/notification.service';
import CryptoJS from 'crypto-js';

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

  notificationService = inject(NotificationService);

  router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  

  onSubmit() {
    if (this.form.valid) {

    this.http.post(`${environment.apiUsuarios}/autenticar`, this.form.value)
    .subscribe({ 
      next: (response) => { 
        
        const dados = CryptoJS.AES
        .encrypt(JSON.stringify(response),'auth').toString();
        
        sessionStorage.setItem('auth', dados);
        this.router.navigate(['/pages/dashboard']);
      }
    });
    }
  }
}