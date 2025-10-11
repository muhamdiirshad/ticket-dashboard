"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createNotificationRouter;
const express_1 = require("express");
const notification_service_1 = __importDefault(require("../services/notifications/notification.service"));
const Notification_1 = __importDefault(require("../models/Notification"));
function createNotificationRouter(io, userSocketMap) {
    const router = (0, express_1.Router)();
    const notificationService = new notification_service_1.default(io, userSocketMap);
    router.get('/', async (req, res) => {
        try {
            const notifications = await Notification_1.default.find({ user: req.user.id }).sort({ createdAt: -1 });
            res.json(notifications);
        }
        catch {
            res.status(500).json({ error: 'Failed to fetch notifications' });
        }
    });
    router.put('/:id/read', async (req, res) => {
        try {
            await Notification_1.default.findByIdAndUpdate(req.params.id, { read: true });
            res.json({ success: true });
        }
        catch {
            res.status(500).json({ error: 'Failed to mark as read' });
        }
    });
    return router;
}
