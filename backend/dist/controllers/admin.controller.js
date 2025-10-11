"use strict";
////////////STEP 2 ////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableSuperUser = enableSuperUser;
exports.disableSuperUser = disableSuperUser;
function enableSuperUser(req, res) {
    const { password } = req.body;
    if (!password)
        return res.status(400).json({ message: 'Password required' });
    if (password !== process.env.SUPERUSER_PASSWORD)
        return res.status(403).json({ message: 'Invalid password' });
    return res.json({ success: true, superUser: true, message: 'Super user mode enabled' });
}
function disableSuperUser(req, res) {
    return res.json({ success: true, superUser: false, message: 'Super user mode disabled' });
}
