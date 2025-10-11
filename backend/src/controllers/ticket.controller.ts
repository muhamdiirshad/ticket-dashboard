//////////// STEP 2 ////////////

import { Request, Response } from 'express';
import * as ticketService from '../services/ticket.service';
import NotificationService from '../services/notifications/notification.service';
import mongoose from 'mongoose';

export async function createTicket(req: Request, res: Response) {
  const user = (req as any).user;
  const { title, description, projectId } = req.body;

  if (!title || !projectId) {
    return res.status(400).json({ message: 'title & projectId required' });
  }

  const ticket = await ticketService.createTicket({
    title,
    description,
    projectId,
    createdBy: user?.id,
  });

  const io = req.app.get('io');
  io?.to(`project:${projectId}`).emit('ticket:created', { ticket });

  // ✅ use NotificationService instance
  const notifier = new NotificationService(io);
  const message = `${user?.email || 'Someone'} created ticket "${ticket.title}"`;
  await notifier.notifyProjectMembers(projectId, message, user?.id);

  res.json({ success: true, ticket });
}

export async function updateTicket(req: Request, res: Response) {
  const user = (req as any).user;
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Ticket ID is required in URL (/tickets/:id)' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Ticket ID format' });
  }

  const update = req.body;
  const ticket = await ticketService.updateTicket(id, { ...update, updatedBy: user?.id });

  if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

  const io = req.app.get('io');
  io?.to(`project:${ticket.project}`).emit('ticket:updated', { ticket });

  // ✅ use NotificationService instance
  const notifier = new NotificationService(io);
  const message = `${user?.email || 'Someone'} updated ticket "${ticket.title}" (status: ${ticket.status})`;
  await notifier.notifyProjectMembers(String(ticket.project), message, user?.id);

  res.json({ success: true, ticket });
}
