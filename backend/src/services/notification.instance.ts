import * as NotificationService from './notifications/notification.service';

let io: any;
let userSocketMap: Map<string, Set<string>>;

export function initNotificationService(ioInstance: any, socketMapInstance: Map<string, Set<string>>) {
  io = ioInstance;
  userSocketMap = socketMapInstance;
  NotificationService.initNotificationIo(io);
  console.log('✅ NotificationService initialized');
}

export { NotificationService };
