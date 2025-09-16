import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../services/notification.service';

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

  notificationService = inject(NotificationService);

  http = inject(HttpClient);

  senhasIguaisValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup;
    const senha = group.get('senha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;
    return senha === confirmarSenha ? null : { senhasDiferentes: true };
  };

  form = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100),
      Validators.pattern(/^[A-Za-zÀ-Üà-ü\s]{6,100}$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])(?!.*\s)(?!.*(.).*\\1).{8,}$/)
    ]),
    confirmarSenha: new FormControl('', [
      Validators.required
    ])
  }, { validators: this.senhasIguaisValidator }
);


  onSubmit() {
    if (this.form.valid) {
      
      const usuario = this.form.getRawValue();

      this.http.post(`${environment.apiUsuarios}/criar`, usuario)
        .subscribe({
          next: (response:any) =>{
            this.notificationService.showSuccess('Usuário criado com sucesso');
            this.form.reset();
          }
        });
    }
  }
}
