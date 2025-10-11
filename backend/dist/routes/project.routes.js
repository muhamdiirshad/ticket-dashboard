"use strict";
////////////STEP 2 ////////////
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("../controllers/project.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.get('/', auth_middleware_1.authMiddleware, project_controller_1.listProjects);
router.post('/', auth_middleware_1.authMiddleware, project_controller_1.createProject);
router.get('/:id', auth_middleware_1.authMiddleware, project_controller_1.getProject);
exports.default = router;
