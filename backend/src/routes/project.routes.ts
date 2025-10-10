////////////STEP 2 ////////////

import express from 'express';
import { listProjects, createProject, getProject } from '../controllers/project.controller';
import { authMiddleware } from '../middleware/auth.middleware';
const router = express.Router();

router.get('/', authMiddleware, listProjects);
router.post('/', authMiddleware, createProject);
router.get('/:id', authMiddleware, getProject);

export default router;
