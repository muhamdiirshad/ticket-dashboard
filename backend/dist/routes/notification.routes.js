"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createNotificationRouter;
const express_1 = require("express");
const Notification_1 = __importDefault(require("../models/Notification"));
function createNotificationRouter(io, userSocketMap) {
    const router = (0, express_1.Router)();
    // Fetch all notifications for the logged-in user
    router.get('/', async (req, res) => {
        try {
            const notifications = await Notification_1.default.find({ recipients: req.user.id })
                .sort({ createdAt: -1 })
                .lean();
            res.json(notifications);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch notifications' });
        }
    });
    // Mark a notification as read
    router.put('/:id/read', async (req, res) => {
        try {
            await Notification_1.default.findByIdAndUpdate(req.params.id, { read: true });
            res.json({ success: true });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to mark notification as read' });
        }
    });
    return router;
}
