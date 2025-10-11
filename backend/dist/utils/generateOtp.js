"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = generateOtp;
////////////STEP 1 ////////////
const crypto_1 = __importDefault(require("crypto"));
function generateOtp() {
    // secure 6-digit numeric OTP
    const num = crypto_1.default.randomInt(0, 1000000);
    return String(num).padStart(6, '0');
}
