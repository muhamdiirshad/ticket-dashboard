"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
async function authMiddleware(req, res, next) {
    const header = req.headers.authorization;
    if (!header)
        return res.status(401).json({ message: 'Authorization header missing' });
    const parts = header.split(' ');
    const token = parts.length === 2 ? parts[1] : parts[0];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'changeme');
        // attach user
        const user = await User_1.default.findById(decoded.id);
        if (!user)
            return res.status(401).json({ message: 'User not found' });
        req.user = { id: user._id.toString(), email: user.email };
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
