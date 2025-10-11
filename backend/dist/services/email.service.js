"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpEmail = sendOtpEmail;
exports.sendEmail = sendEmail;
////////////STEP 1 and 2////////////
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: (process.env.SMTP_SECURE === 'true'),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
async function sendOtpEmail(to, otp) {
    const from = process.env.FROM_EMAIL || process.env.SMTP_USER;
    const subject = 'Your OTP for Ticket Dashboard';
    const text = `Your OTP is ${otp}. It expires in ${process.env.OTP_EXPIRES_MINUTES || 5} minutes.`;
    const html = `<p>Your OTP is <strong>${otp}</strong>. It expires in ${process.env.OTP_EXPIRES_MINUTES || 5} minutes.</p>`;
    try {
        const info = await transporter.sendMail({ from, to, subject, text, html });
        console.log('OTP email sent:', info.messageId);
        return info;
    }
    catch (err) {
        console.error('Failed to send OTP email (check SMTP settings). Error:', err);
        throw err;
    }
}
async function sendEmail(to, subject, text, html) {
    const from = process.env.FROM_EMAIL || process.env.SMTP_USER;
    try {
        const info = await transporter.sendMail({ from, to, subject, text, html });
        console.log('Email sent:', info.messageId);
        return info;
    }
    catch (err) {
        console.error('Failed to send email', err);
        throw err;
    }
}
