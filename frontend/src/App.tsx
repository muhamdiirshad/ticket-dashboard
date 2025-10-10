import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import { useAppSelector } from './hooks';

export default function App() {
  const token = useAppSelector(s => s.auth.token);
  return (
    <BrowserRouter>
      <Routes>
        {!token ? (
          <Route path="*" element={<LoginPage />} />
        ) : (
          <>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
