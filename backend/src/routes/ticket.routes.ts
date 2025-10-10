////////////STEP 2 ////////////

import express from 'express';
import * as ticketController from '../controllers/ticket.controller';
import { authMiddleware } from '../middleware/auth.middleware';
const router = express.Router();


router.post('/', ticketController.createTicket);
router.put('/:id', ticketController.updateTicket); 

export default router;
