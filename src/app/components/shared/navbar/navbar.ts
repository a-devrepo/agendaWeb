import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [
    RouterLink,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  router = inject(Router);

  nomeUsuario = signal('');
  emailUsuario = signal('');

  ngOnInit(){

    const auth = sessionStorage.getItem('auth');

    if(auth){
      const bytes = CryptoJS.AES.decrypt(auth, 'auth');
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      const usuario = JSON.parse(decryptedData);

      console.log(usuario)
      this.nomeUsuario.set(usuario.nome);
      this.emailUsuario.set(usuario.email);
    }
  }

  logout(){
    if(confirm('Deseja realmente sair do sistema?')){
      
      sessionStorage.removeItem('auth');

      this.router.navigate(['/pages/dashboard']);
    }
  }
}
