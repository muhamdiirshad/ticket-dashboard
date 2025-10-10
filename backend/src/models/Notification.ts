import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  projectId?: string;
  message: string;
  recipients: string[]; // user ids or emails
  createdAt: Date;
  readBy?: string[]; // user ids
}

const NotificationSchema = new Schema<INotification>({
  projectId: { type: String },
  message: { type: String, required: true },
  recipients: [{ type: String }],
  readBy: [{ type: String }]
}, { timestamps: { createdAt: true, updatedAt: false } });

export default mongoose.model<INotification>('Notification', NotificationSchema);
