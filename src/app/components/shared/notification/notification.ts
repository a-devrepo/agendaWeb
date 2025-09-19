import { Component } from '@angular/core';
import { CommonModule, NgFor, NgClass } from '@angular/common';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, NgFor, NgClass],
  templateUrl: './notification.html',
  styleUrls: ['./notification.css']
})
export class Notification {
  constructor(public notificationService: NotificationService) {}
}