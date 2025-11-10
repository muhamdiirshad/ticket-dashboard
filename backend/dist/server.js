"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const project_routes_1 = __importDefault(require("./routes/project.routes"));
const ticket_routes_1 = __importDefault(require("./routes/ticket.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const db_1 = require("./config/db");
const User_1 = __importDefault(require("./models/User"));
const notification_service_1 = require("./services/notifications/notification.service");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        'https://ticket-dashboard.vercel.app', // your frontend live link
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express_1.default.json());
// Register API routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/projects', project_routes_1.default);
app.use('/api/tickets', ticket_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
// Create HTTP + WebSocket server
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] }
});
// Attach Socket.IO to Express app
app.set('io', io);
// Initialize notification service
try {
    (0, notification_service_1.initNotificationIo)(io);
}
catch (err) {
    console.warn('Notification service initialization skipped:', err);
}
// Socket authentication middleware
io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth?.token;
        if (!token)
            return next();
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'changeme');
        socket.data.userId = decoded.id;
        next();
    }
    catch (err) {
        console.warn('Socket auth failed:', err.message);
        next();
    }
});
// Socket.IO connection handlers
io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);
    if (socket.data.userId) {
        User_1.default.findByIdAndUpdate(socket.data.userId, {
            socketId: socket.id,
            lastSeen: null
        }).catch(console.error);
    }
    socket.on('join-project', (projectId) => {
        socket.join(`project:${projectId}`);
        console.log(`${socket.id} joined project:${projectId}`);
    });
    socket.on('leave-project', (projectId) => {
        socket.leave(`project:${projectId}`);
        console.log(`${socket.id} left project:${projectId}`);
    });
    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
        User_1.default.findOneAndUpdate({ socketId: socket.id }, { socketId: null, lastSeen: new Date() }).catch(console.error);
    });
});
const PORT = process.env.PORT || 5000;
// Start the backend server
async function start() {
    try {
        await (0, db_1.connectDB)(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ticket-dashboard');
        console.log('✅ Connected to MongoDB');
        server.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
}
start();
