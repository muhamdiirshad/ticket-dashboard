////////////STEP 2 ////////////

import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description?: string;
  createdBy?: string;
  members: string[]; // user IDs
  tickets: mongoose.Types.ObjectId[];
}

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String },
  createdBy: { type: String },
  members: [{ type: String }], // store user ids
  tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }]
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);
