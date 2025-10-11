"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestOtp = requestOtp;
exports.verifyOtp = verifyOtp;
////////////STEP 1 ////////////
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateOtp_1 = require("../utils/generateOtp");
const email_service_1 = require("./email.service");
const OTP_EXPIRES_MINUTES = Number(process.env.OTP_EXPIRES_MINUTES || 5);
async function requestOtp(email) {
    const otp = (0, generateOtp_1.generateOtp)(); // e.g. "023456"
    const salt = await bcryptjs_1.default.genSalt(10);
    const otpHash = await bcryptjs_1.default.hash(otp, salt);
    const otpExpires = new Date(Date.now() + OTP_EXPIRES_MINUTES * 60 * 1000);
    let user = await User_1.default.findOne({ email });
    if (!user)
        user = new User_1.default({ email });
    user.otpHash = otpHash;
    user.otpExpires = otpExpires;
    await user.save();
    // send email, but don't let an email failure break the request
    await (0, email_service_1.sendOtpEmail)(email, otp);
    return { ok: true, message: 'OTP generated and (attempted) to send via email.' };
}
async function verifyOtp(email, otp) {
    const user = await User_1.default.findOne({ email });
    if (!user)
        throw new Error('No user found for this email.');
    if (!user.otpHash || !user.otpExpires)
        throw new Error('No OTP requested. Request a new OTP.');
    if (user.otpExpires.getTime() < Date.now()) {
        user.otpHash = null;
        user.otpExpires = null;
        await user.save();
        throw new Error('OTP expired. Request a new one.');
    }
    const ok = await bcryptjs_1.default.compare(otp, user.otpHash);
    if (!ok)
        throw new Error('Invalid OTP.');
    // success — clear otp fields and mark verified
    user.isVerified = true;
    user.otpHash = null;
    user.otpExpires = null;
    await user.save();
    const payload = { id: user._id, email: user.email };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'changeme', { expiresIn: '7d' });
    return {
        token,
        user: {
            id: user._id,
            email: user.email,
            isVerified: user.isVerified
        }
    };
}
