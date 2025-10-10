////////////STEP 2 ////////////

import mongoose, { Schema, Document } from 'mongoose';

export type TicketStatus = 'todo' | 'in-progress' | 'done';

export interface ITicket extends Document {
  title: string;
  description?: string;
  project: mongoose.Types.ObjectId;
  status: TicketStatus;
  createdBy?: string;
  updatedBy?: string;
  order?: number;
}

const TicketSchema = new Schema<ITicket>({
  title: { type: String, required: true },
  description: { type: String },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  status: { type: String, default: 'todo' },
  createdBy: { type: String },
  updatedBy: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model<ITicket>('Ticket', TicketSchema);
