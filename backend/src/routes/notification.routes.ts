import { Router } from 'express';
import NotificationModel from '../models/Notification';

export default function createNotificationRouter(io: any, userSocketMap: Map<string, Set<string>>) {
  const router = Router();

  // Fetch all notifications for the logged-in user
  router.get('/', async (req: any, res) => {
    try {
      const notifications = await NotificationModel.find({ recipients: req.user.id })
        .sort({ createdAt: -1 })
        .lean();
      res.json(notifications);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  });

  // Mark a notification as read
  router.put('/:id/read', async (req, res) => {
    try {
      await NotificationModel.findByIdAndUpdate(req.params.id, { read: true });
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to mark notification as read' });
    }
  });

  return router;
}
