import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendOtp } from '../../features/auth/authSlice';

export default function LoginRequest() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const auth = useAppSelector(s => s.auth);

  return (
    <form className="card" onSubmit={(e) => { e.preventDefault(); dispatch(sendOtp(email)); }}>
      <h3>Sign in</h3>
      <p className="muted">Enter your email to receive an OTP</p>
      <input className="input" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
      <button className="btn">Send OTP</button>
      {auth.error && <div className="text-danger">{auth.error}</div>}
    </form>
  );
}
