////////////STEP 1 ////////////
import express from 'express';
import { requestOtpController, verifyOtpController } from '../controllers/auth.controller';
const router = express.Router();

router.post('/request-otp', requestOtpController);
router.post('/verify-otp', verifyOtpController);

export default router;
