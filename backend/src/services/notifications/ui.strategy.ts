////////////STEP 2 ////////////
import { INotificationStrategy } from './notification.interface';
import { Server as IOServer } from 'socket.io';

let io: IOServer | null = null;
export function setIoInstance(server: IOServer) { io = server; }

export class UiNotificationStrategy implements INotificationStrategy {
  async notify(payload: any) {
    if (!io) return;
    // payload example: { room: 'project:ID', event: 'activity', data: {...} }
    if (payload.room) {
      io.to(payload.room).emit(payload.event || 'notification:ui', payload.data);
    } else {
      io.emit(payload.event || 'notification:ui', payload.data);
    }
  }
}
