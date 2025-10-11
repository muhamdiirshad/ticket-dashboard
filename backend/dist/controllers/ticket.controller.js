"use strict";
////////////STEP 2 ////////////
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTicket = createTicket;
exports.updateTicket = updateTicket;
const ticketService = __importStar(require("../services/ticket.service"));
const notification_service_1 = require("../services/notifications/notification.service");
const mongoose_1 = __importDefault(require("mongoose"));
async function createTicket(req, res) {
    const user = req.user;
    const { title, description, projectId } = req.body;
    if (!title || !projectId)
        return res.status(400).json({ message: 'title & projectId required' });
    const ticket = await ticketService.createTicket({ title, description, projectId, createdBy: user?.id });
    // broadcast via socket to project room
    const io = req.app.get('io');
    io?.to(`project:${projectId}`).emit('ticket:created', { ticket });
    // notify members (UI or email)
    const message = `${user?.email || 'Someone'} created ticket "${ticket.title}"`;
    await (0, notification_service_1.notifyProjectMembers)(projectId, message, user?.id);
    res.json({ success: true, ticket });
}
async function updateTicket(req, res) {
    const user = req.user;
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'Ticket ID is required in URL (/tickets/:id)' });
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Ticket ID format' });
    }
    const update = req.body;
    const ticket = await ticketService.updateTicket(id, { ...update, updatedBy: user?.id });
    if (!ticket)
        return res.status(404).json({ message: 'Ticket not found' });
    // broadcast + notify
    const io = req.app.get('io');
    io?.to(`project:${ticket.project}`).emit('ticket:updated', { ticket });
    const message = `${user?.email || 'Someone'} updated ticket "${ticket.title}" (status: ${ticket.status})`;
    await (0, notification_service_1.notifyProjectMembers)(String(ticket.project), message, user?.id);
    res.json({ success: true, ticket });
}
