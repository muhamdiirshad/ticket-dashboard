import { io, Socket } from 'socket.io-client';

const URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function createSocket(token?: string): Socket {
  return io(URL, {
    autoConnect: false,
    auth: { token }
  });
}
