import NotificationService from './notifications/notification.service';

let io: any;
let userSocketMap: Map<string, Set<string>>;
let notificationService: NotificationService;

export function initNotificationService(ioInstance: any, socketMapInstance: Map<string, Set<string>>) {
  io = ioInstance;
  userSocketMap = socketMapInstance;
  notificationService = new NotificationService(io, userSocketMap);
  console.log('✅ NotificationService initialized');
}

export { notificationService };
