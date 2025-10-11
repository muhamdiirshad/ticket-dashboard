"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
////////////STEP 2 ////////////
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post('/enable-super', auth_middleware_1.authMiddleware, admin_controller_1.enableSuperUser);
router.post('/disable-super', auth_middleware_1.authMiddleware, admin_controller_1.disableSuperUser);
exports.default = router;
