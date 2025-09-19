import { inject } from '@angular/core';
import { HttpEvent, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { ApiErrorResponse } from '../models/api-error-response.model';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {
    const notificationService = inject(NotificationService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.error) {
                const apiError: ApiErrorResponse = error.error;
                
                if (apiError.errors?.length) {
                    apiError.errors.forEach(msg => notificationService.showError(msg));
                } else if (apiError.message) {
                    notificationService.showError(apiError.message);
                }
                else {
                    notificationService.showError('Erro desconhecido');
                }
            } else {
                notificationService.showError('Erro de conexão com o servidor');
            }
            return throwError(() => error);
        })
    );
};
