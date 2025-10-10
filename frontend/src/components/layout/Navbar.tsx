import React from 'react';
import NotificationBell from '../ui/NotificationBell';
import SuperUserToggle from '../ui/SuperUserToggle';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="brand">Ticket Dashboard</div>
      </div>
      <div className="nav-right">
        <NotificationBell />
        <SuperUserToggle />
      </div>
    </nav>
  );
}
