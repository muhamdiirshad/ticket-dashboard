import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as IOServer } from 'socket.io';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/auth.routes';
import projectRoutes from './routes/project.routes';
import ticketRoutes from './routes/ticket.routes';
import adminRoutes from './routes/admin.routes';
import { connectDB } from './config/db';
import User from './models/User';
import { initNotificationIo } from './services/notifications/notification.service';

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ticket-dashboard.vercel.app"
    ],
    credentials: true,
  })
);
app.use(express.json());

// Register API routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/admin', adminRoutes);

// Create HTTP + WebSocket server
const server = http.createServer(app);
const io = new IOServer(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// Attach Socket.IO to Express app
app.set('io', io);

// Initialize notification service
try {
  initNotificationIo(io);
} catch (err) {
  console.warn('Notification service initialization skipped:', err);
}

// Socket authentication middleware
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next();
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'changeme') as any;
    socket.data.userId = decoded.id;
    next();
  } catch (err) {
    console.warn('Socket auth failed:', (err as Error).message);
    next();
  }
});

// Socket.IO connection handlers
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  if (socket.data.userId) {
    User.findByIdAndUpdate(socket.data.userId, {
      socketId: socket.id,
      lastSeen: null
    }).catch(console.error);
  }

  socket.on('join-project', (projectId: string) => {
    socket.join(`project:${projectId}`);
    console.log(`${socket.id} joined project:${projectId}`);
  });

  socket.on('leave-project', (projectId: string) => {
    socket.leave(`project:${projectId}`);
    console.log(`${socket.id} left project:${projectId}`);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
    User.findOneAndUpdate(
      { socketId: socket.id },
      { socketId: null, lastSeen: new Date() }
    ).catch(console.error);
  });
});

const PORT = process.env.PORT || 5000;

// Start the backend server
async function start() {
  try {
    await connectDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ticket-dashboard');
    console.log('✅ Connected to MongoDB');

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

start();
