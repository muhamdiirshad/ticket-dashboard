////////////STEP 1 ////////////
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  isVerified: boolean;
  otpHash?: string | null;
  otpExpires?: Date | null;
  socketId?: string | null;
  lastSeen?: Date | null;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  otpHash: { type: String, default: null },
  otpExpires: { type: Date, default: null },
  socketId: { type: String, default: null },
  lastSeen: { type: Date, default: null }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
