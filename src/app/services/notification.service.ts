import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error';

export interface Notification {
    id: number;
    type: NotificationType;
    message: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private _notifications = signal<Notification[]>([]);
    notifications = this._notifications.asReadonly();

    private idCounter = 0;

    showSuccess(message: string) {
        this.addNotification('success', message);
    }

    showError(message: string) {
        this.addNotification('error', message);
    }

    private addNotification(type: NotificationType, message: string) {
        const id = this.idCounter++;
        const notification: Notification = { id, type, message };
        this._notifications.update(notifs => [...notifs, notification]);

        setTimeout(() => this.removeNotification(id), 5000);
    }

    removeNotification(id: number) {
        this._notifications.update(notifs => notifs.filter(n => n.id !== id));
    }
}
