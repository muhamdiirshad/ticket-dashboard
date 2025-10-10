////////////STEP 1 ////////////
import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export async function requestOtpController(req: Request, res: Response) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });
    await authService.requestOtp(email);
    return res.json({ success: true, message: 'OTP requested. Check your email.' });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message || 'Server error' });
  }
}

export async function verifyOtpController(req: Request, res: Response) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP required' });
    const result = await authService.verifyOtp(email, otp);
    return res.json({ success: true, ...result });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
}
