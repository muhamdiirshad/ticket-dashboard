import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { confirmOtp } from '../../features/auth/authSlice';

export default function VerifyOtp() {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(s => s.auth);
  const [otp, setOtp] = useState('');

  if (!email) return null;

  return (
    <form className="card" onSubmit={(e) => { e.preventDefault(); dispatch(confirmOtp({ email, otp })); }}>
      <h3>Verify OTP</h3>
      <p className="muted">OTP sent to <strong>{email}</strong></p>
      <input className="input" type="text" required placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
      <button className="btn btn-success">Verify</button>
    </form>
  );
}
