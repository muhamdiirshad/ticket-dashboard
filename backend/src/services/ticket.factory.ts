////////////STEP 2 ////////////

import TicketModel from '../models/Ticket';
import ProjectModel from '../models/Project';

export async function createTicketFactory({
  title,
  description,
  projectId,
  createdBy,
  status = 'todo'
}: {
  title: string;
  description?: string;
  projectId: string;
  createdBy?: string;
  status?: string;
}) {
  const ticket = await TicketModel.create({
    title,
    description,
    project: projectId,
    createdBy,
    status
  });

  await ProjectModel.findByIdAndUpdate(projectId, { $push: { tickets: ticket._id, members: createdBy } });

  return ticket;
}
