////////////STEP 1 ////////////
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateOtp } from '../utils/generateOtp';
import { sendOtpEmail } from './email.service';

const OTP_EXPIRES_MINUTES = Number(process.env.OTP_EXPIRES_MINUTES || 5);

export async function requestOtp(email: string) {
  const otp = generateOtp(); // e.g. "023456"
  const salt = await bcrypt.genSalt(10);
  const otpHash = await bcrypt.hash(otp, salt);
  const otpExpires = new Date(Date.now() + OTP_EXPIRES_MINUTES * 60 * 1000);

  let user = await User.findOne({ email });
  if (!user) user = new User({ email });

  user.otpHash = otpHash;
  user.otpExpires = otpExpires;
  await user.save();

  // send email, but don't let an email failure break the request
  await sendOtpEmail(email, otp);

  return { ok: true, message: 'OTP generated and (attempted) to send via email.' };
}

export async function verifyOtp(email: string, otp: string) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('No user found for this email.');

  if (!user.otpHash || !user.otpExpires) throw new Error('No OTP requested. Request a new OTP.');

  if (user.otpExpires.getTime() < Date.now()) {
    user.otpHash = null;
    user.otpExpires = null;
    await user.save();
    throw new Error('OTP expired. Request a new one.');
  }

  const ok = await bcrypt.compare(otp, user.otpHash);
  if (!ok) throw new Error('Invalid OTP.');

  // success — clear otp fields and mark verified
  user.isVerified = true;
  user.otpHash = null;
  user.otpExpires = null;
  await user.save();

  const payload = { id: user._id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'changeme', { expiresIn: '7d' });

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      isVerified: user.isVerified
    }
  };
}
