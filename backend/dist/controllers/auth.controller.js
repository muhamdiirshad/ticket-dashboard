"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestOtpController = requestOtpController;
exports.verifyOtpController = verifyOtpController;
const authService = __importStar(require("../services/auth.service"));
async function requestOtpController(req, res) {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ message: 'Email required' });
        await authService.requestOtp(email);
        return res.json({ success: true, message: 'OTP requested. Check your email.' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message || 'Server error' });
    }
}
async function verifyOtpController(req, res) {
    try {
        const { email, otp } = req.body;
        if (!email || !otp)
            return res.status(400).json({ message: 'Email and OTP required' });
        const result = await authService.verifyOtp(email, otp);
        return res.json({ success: true, ...result });
    }
    catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
}
