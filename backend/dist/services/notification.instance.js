"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = void 0;
exports.initNotificationService = initNotificationService;
const notification_service_1 = __importDefault(require("./notifications/notification.service"));
let io;
let userSocketMap;
let notificationService;
function initNotificationService(ioInstance, socketMapInstance) {
    io = ioInstance;
    userSocketMap = socketMapInstance;
    exports.notificationService = notificationService = new notification_service_1.default(io, userSocketMap);
    console.log('✅ NotificationService initialized');
}
