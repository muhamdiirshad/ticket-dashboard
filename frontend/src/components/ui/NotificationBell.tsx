import React, { useState } from 'react';
import { useAppSelector } from '../../hooks';

export default function NotificationBell() {
  const items = useAppSelector(s => s.notifications.list);
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button className="icon-btn" onClick={() => setOpen(v => !v)} aria-label="notifications">🔔 {items.length > 0 ? <span className="badge">{items.length}</span> : null}</button>

      {open && (
        <div className="notif-dropdown">
          <h4>Activity</h4>
          <div className="notif-list">
            {items.length === 0 && <div className="muted">No notifications</div>}
            {items.map((n: any, idx: number) => (
              <div key={idx} className="notif-item">{n.message || JSON.stringify(n)}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
