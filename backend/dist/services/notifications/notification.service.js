"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initNotificationIo = initNotificationIo;
const Project_1 = __importDefault(require("../../models/Project"));
const User_1 = __importDefault(require("../../models/User"));
const ui_strategy_1 = require("./ui.strategy");
const email_strategy_1 = require("./email.strategy");
const Notification_1 = __importDefault(require("../../models/Notification"));
const OFFLINE_THRESHOLD_MS = Number(process.env.OFFLINE_THRESHOLD_MS ?? 60000);
let io = null;
/**
 * Initializes the global Socket.IO instance for notifications.
 */
function initNotificationIo(ioInstance) {
    io = ioInstance;
    (0, ui_strategy_1.setIoInstance)(ioInstance);
    console.log('✅ Notification service initialized.');
}
/**
 * Main Notification Service class.
 */
class NotificationService {
    constructor(io) {
        this.io = io;
        (0, ui_strategy_1.setIoInstance)(io);
    }
    async notifyProjectMembers(projectId, message, actorUserId) {
        const project = await Project_1.default.findById(projectId).lean();
        if (!project)
            return;
        const members = project.members || [];
        const ui = new ui_strategy_1.UiNotificationStrategy();
        const emailStrategy = new email_strategy_1.EmailNotificationStrategy();
        await Notification_1.default.create({ projectId, message, recipients: members });
        const users = await User_1.default.find({ _id: { $in: members } }).lean();
        for (const user of users) {
            if (String(user._id) === String(actorUserId))
                continue;
            if (user.socketId) {
                await ui.notify({
                    room: `project:${projectId}`,
                    event: 'activity',
                    data: { message, projectId, timestamp: new Date(), to: user._id }
                });
            }
            else {
                const lastSeen = user.lastSeen ? new Date(user.lastSeen).getTime() : 0;
                if (Date.now() - lastSeen > OFFLINE_THRESHOLD_MS) {
                    await emailStrategy.notify({
                        to: String(user.email),
                        subject: 'Ticket Update',
                        message
                    });
                }
            }
        }
    }
}
exports.default = NotificationService;
