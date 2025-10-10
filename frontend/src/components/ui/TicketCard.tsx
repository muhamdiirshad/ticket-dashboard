import React from 'react';

export default function TicketCard({ ticket, superOn, onMove }: any) {
  return (
    <div className="ticket-card">
      <div className="ticket-title">{ticket.title}</div>
      {ticket.description && <div className="muted">{ticket.description}</div>}
      {superOn && <div className="muted small">Created by: {ticket.createdBy || '—'}</div>}
      <div style={{ marginTop: 8 }}>
        {ticket.status !== 'todo' && <button className="link-btn" onClick={() => onMove(ticket._id, 'todo')}>To Todo</button>}
        {ticket.status !== 'in-progress' && <button className="link-btn" onClick={() => onMove(ticket._id || ticket.id, 'in-progress')}>To In Progress</button>}
        {ticket.status !== 'done' && <button className="link-btn" onClick={() => onMove(ticket._id, 'done')}>To Done</button>}
      </div>
    </div>
  );
}
