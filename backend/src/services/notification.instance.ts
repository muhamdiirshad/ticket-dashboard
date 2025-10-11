import NotificationService, { initNotificationIo } from './notifications/notification.service';

let io: any;
let userSocketMap: Map<string, Set<string>>;

/**
 * Initializes the notification service globally.
 */
export function initNotificationService(ioInstance: any, socketMapInstance: Map<string, Set<string>>) {
  io = ioInstance;
  userSocketMap = socketMapInstance;
  initNotificationIo(io);
  console.log('✅ NotificationService initialized globally');
}

export { NotificationService };
