////////////STEP 1 ////////////
import crypto from 'crypto';

export function generateOtp(): string {
  // secure 6-digit numeric OTP
  const num = crypto.randomInt(0, 1000000);
  return String(num).padStart(6, '0');
}
