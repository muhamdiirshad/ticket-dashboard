import TicketModel from '../models/Ticket';
import { createTicketFactory } from './ticket.factory';

export async function createTicket(payload: { title: string; description?: string; projectId: string; createdBy?: string }) {
  return createTicketFactory(payload);
}

export async function updateTicket(ticket_Id: string, update: any) {
  return TicketModel.findByIdAndUpdate(ticket_Id, update, { new: true });
}

export async function listTicketsForProject(projectId: string) {
  return TicketModel.find({ project: projectId }).sort({ order: 1 }).lean();
}
