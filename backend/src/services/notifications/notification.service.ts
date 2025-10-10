import ProjectModel from '../../models/Project';
import User from '../../models/User';
import { UiNotificationStrategy, setIoInstance } from './ui.strategy';
import { EmailNotificationStrategy } from './email.strategy';
import { Server as IOServer } from 'socket.io';
import NotificationModel from '../../models/Notification';

const OFFLINE_THRESHOLD_MS = Number(process.env.OFFLINE_THRESHOLD_MS ?? 60000);

export function initNotificationIo(io: IOServer) {
  setIoInstance(io);
}

export async function notifyProjectMembers(projectId: string, message: string, actorUserId?: string) {
  const project = await ProjectModel.findById(projectId).lean();
  if (!project) return;

  // get members (user ids)
  const members = project.members || [];

  const ui = new UiNotificationStrategy();
  const emailStrategy = new EmailNotificationStrategy();

  // persist notification
  await NotificationModel.create({ projectId, message, recipients: members });

  // for each member choose strategy
  const users = await User.find({ _id: { $in: members } }).lean();
  for (const user of users) {
    if (String(user._id) === String(actorUserId)) continue; // optionally skip actor

    if (user.socketId) {
      // Online
      await ui.notify({
        room: `project:${projectId}`,
        event: 'activity',
        data: { message, projectId, timestamp: new Date(), to: user._id }
      });
    } else {
      // Offline -> send email if lastSeen older than threshold (or null)
      const lastSeen = user.lastSeen ? new Date(user.lastSeen).getTime() : 0;
      if (Date.now() - lastSeen > OFFLINE_THRESHOLD_MS) {
        await emailStrategy.notify({ to: String(user.email), subject: 'Ticket update', message });
      }
    }
  }
}
