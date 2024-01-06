import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('ws://localhost:3000');
  }
  // Emit a message to the server
  sendMessage(eventName: string, message: any): void {
    this.socket.emit(eventName, message);
  }

  // Listen for a specific event from the server
  // Listen for a specific event from the server
  onMessage(eventName: string): Observable<any> {
    return new Observable((observer) => {
      const handler = (data: any) => observer.next(data);

      this.socket.on(eventName, handler);

      // Provide a cleanup mechanism using the complete method of the observer
      return () => {
        this.socket.off(eventName, handler);
      };
    });
  }
}
