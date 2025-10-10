import { Router } from 'express';
import NotificationService from '../services/notifications/notification.service';
import NotificationModel from '../models/Notification';

export default function createNotificationRouter(io: any, userSocketMap: Map<string, Set<string>>) {
  const router = Router();
  const notificationService = new NotificationService(io, userSocketMap);

  router.get('/', async (req: any, res) => {
    try {
      const notifications = await NotificationModel.find({ user: req.user.id }).sort({ createdAt: -1 });
      res.json(notifications);
    } catch {
      res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  });
  
  router.put('/:id/read', async (req, res) => {
    try {
      await NotificationModel.findByIdAndUpdate(req.params.id, { read: true });
      res.json({ success: true });
    } catch {
      res.status(500).json({ error: 'Failed to mark as read' });
    }
  });

  return router;
}
