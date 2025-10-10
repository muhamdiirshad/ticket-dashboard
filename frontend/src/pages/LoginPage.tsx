import React from 'react';
import LoginRequest from '../components/auth/LoginRequest';
import VerifyOtp from '../components/auth/VerifyOtp';
import { useAppSelector } from '../hooks';

export default function LoginPage() {
  const { email, isVerified } = useAppSelector(s => s.auth);

  return (
    <div className="page-center">
      <div className="auth-wrapper">
        <h1>Ticket Dashboard</h1>
        {!email && <LoginRequest />}
        {email && !isVerified && <VerifyOtp />}
        {isVerified && <div className="muted">OTP verified — redirecting...</div>}
      </div>
    </div>
  );
}
