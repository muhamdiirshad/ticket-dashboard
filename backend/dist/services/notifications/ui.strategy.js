"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UiNotificationStrategy = void 0;
exports.setIoInstance = setIoInstance;
let io = null;
function setIoInstance(server) { io = server; }
class UiNotificationStrategy {
    async notify(payload) {
        if (!io)
            return;
        // payload example: { room: 'project:ID', event: 'activity', data: {...} }
        if (payload.room) {
            io.to(payload.room).emit(payload.event || 'notification:ui', payload.data);
        }
        else {
            io.emit(payload.event || 'notification:ui', payload.data);
        }
    }
}
exports.UiNotificationStrategy = UiNotificationStrategy;
