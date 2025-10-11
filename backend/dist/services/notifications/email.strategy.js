"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailNotificationStrategy = void 0;
const email_service_1 = require("../email.service");
class EmailNotificationStrategy {
    async notify(payload) {
        try {
            await (0, email_service_1.sendEmail)(payload.to, payload.subject, payload.message);
        }
        catch (err) {
            console.error('Email strategy failed for', payload.to, err);
        }
    }
}
exports.EmailNotificationStrategy = EmailNotificationStrategy;
