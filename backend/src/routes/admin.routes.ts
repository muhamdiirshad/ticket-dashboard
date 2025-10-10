////////////STEP 2 ////////////
import express from 'express';
import { enableSuperUser, disableSuperUser } from '../controllers/admin.controller';
import { authMiddleware } from '../middleware/auth.middleware';
const router = express.Router();

router.post('/enable-super', authMiddleware, enableSuperUser);
router.post('/disable-super', authMiddleware, disableSuperUser);

export default router;
