import ProjectModel from '../../models/Project';
import User from '../../models/User';
import { UiNotificationStrategy, setIoInstance } from './ui.strategy';
import { EmailNotificationStrategy } from './email.strategy';
import { Server as IOServer } from 'socket.io';
import NotificationModel from '../../models/Notification';

const OFFLINE_THRESHOLD_MS = Number(process.env.OFFLINE_THRESHOLD_MS ?? 60000);

let io: IOServer | null = null;

/**
 * Initializes the global Socket.IO instance for notifications.
 */
export function initNotificationIo(ioInstance: IOServer) {
  io = ioInstance;
  setIoInstance(ioInstance);
  console.log('✅ Notification service initialized.');
}

/**
 * Main Notification Service class.
 */
class NotificationService {
  constructor(private io: IOServer) {
    setIoInstance(io);
  }

  async notifyProjectMembers(projectId: string, message: string, actorUserId?: string) {
    const project = await ProjectModel.findById(projectId).lean();
    if (!project) return;

    const members = project.members || [];
    const ui = new UiNotificationStrategy();
    const emailStrategy = new EmailNotificationStrategy();

    await NotificationModel.create({ projectId, message, recipients: members });

    const users = await User.find({ _id: { $in: members } }).lean();
    for (const user of users) {
      if (String(user._id) === String(actorUserId)) continue;

      if (user.socketId) {
        await ui.notify({
          room: `project:${projectId}`,
          event: 'activity',
          data: { message, projectId, timestamp: new Date(), to: user._id }
        });
      } else {
        const lastSeen = user.lastSeen ? new Date(user.lastSeen).getTime() : 0;
        if (Date.now() - lastSeen > OFFLINE_THRESHOLD_MS) {
          await emailStrategy.notify({
            to: String(user.email),
            subject: 'Ticket Update',
            message
          });
        }
      }
    }
  }
}

export default NotificationService;
