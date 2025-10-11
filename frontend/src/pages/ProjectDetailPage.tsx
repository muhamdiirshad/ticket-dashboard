import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loadProject, createTicket, editTicket } from '../features/tickets/ticketsSlice';
import TicketCard from '../components/ui/TicketCard';
import { createSocket } from '../utils/socket';
import { pushNotification } from '../features/notifications/notificationsSlice';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const project = useAppSelector(s => s.tickets.project);
  const superOn = useAppSelector(s => s.superuser.enabled);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const token = localStorage.getItem('token') || undefined;

  useEffect(() => {
    if (!id) return;
    dispatch(loadProject(id));
    const socket = createSocket(token);
    socket.connect();
    socket.emit('join-project', id);

    socket.on('ticket:created', (data: any) => {
      dispatch(loadProject(id));
      dispatch(pushNotification({ message: `Ticket created: ${data.ticket.title}` }));
    });

    socket.on('ticket:updated', (data: any) => {
      dispatch(loadProject(id));
      dispatch(pushNotification({ message: `Ticket updated: ${data.ticket.title}` }));
    });

    socket.on('activity', (data: any) => {
      dispatch(pushNotification({ message: data.message }));
    });

    return () => { socket.emit('leave-project', id); socket.disconnect(); };
  }, [id]);

  const onCreate = () => {
    if (!id) return;
    dispatch(createTicket({ projectId: id as string, title, description: desc }));
    setTitle(''); setDesc('');
  };
  const onMove = (ticketId: string | undefined, newStatus: string) => {
    if (!ticketId) return console.error('❌ Missing ticketId');
    dispatch(editTicket({ id: ticketId, update: { status: newStatus } }));
  };

  if (!project) return <div><Navbar /><div className="container">Loading...</div></div>;

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>{project.name}</h2>

        <div className="create-row">
          <input className="input" placeholder="Ticket title" value={title} onChange={e => setTitle(e.target.value)} />
          <input className="input" placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
          <button className="btn" onClick={onCreate}>Add Ticket</button>
        </div>

        <div className="board">
          {['todo', 'in-progress', 'done'].map((col) => (
            <div key={col} className="column">
              <div className="column-title">{col.replace('-', ' ')}</div>
              <div className="column-list">
                {project.tickets.filter((t: any) => t.status === col).map((t: any) => (
                  <TicketCard key={t._id} ticket={t} superOn={superOn} onMove={onMove} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
