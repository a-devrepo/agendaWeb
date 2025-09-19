import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import CryptoJS from 'crypto-js';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const auth = sessionStorage.getItem('auth');

  if (!auth) {
    return router.parseUrl('/pages/autenticar-usuario');
  }

  try {
    const bytes = CryptoJS.AES.decrypt(auth, 'auth');
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    const usuario = JSON.parse(decryptedData);

    const expiracao = new Date(usuario.dataHoraExpiracao);
    if (expiracao < new Date()) {
      sessionStorage.removeItem('auth');
      return router.parseUrl('/pages/autenticar-usuario');
    }

    return true;
  } catch (e) {
    sessionStorage.removeItem('auth');
    return router.parseUrl('/pages/autenticar-usuario');
  }
};