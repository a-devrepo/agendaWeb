// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';
import CryptoJS from 'crypto-js';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    if (
        req.url.startsWith(environment.apiTarefas) ||
        req.url.startsWith(environment.apiCategorias)
    ) {
        const auth = sessionStorage.getItem('auth');
        const decrypted = CryptoJS.AES.decrypt(auth as string, 'auth').toString(CryptoJS.enc.Utf8);
        if (decrypted) {
            try {
                const usuario = JSON.parse(decrypted);
                const token = usuario?.token;

                if (token) {
                    const authReq = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return next(authReq);
                }
            } catch (e) {
                console.error('Erro ao recuperar token no interceptor:', e);
            }
        }
    }

    return next(req);
};
