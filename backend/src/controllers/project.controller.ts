////////////STEP 2 ////////////

import { Request, Response } from 'express';
import * as projectService from '../services/project.service';

export async function listProjects(req: Request, res: Response) {
  const projects = await projectService.listProjects();
  res.json({ success: true, projects });
}

export async function createProject(req: Request, res: Response) {
  const user = (req as any).user;
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: 'Name required' });
  const project = await projectService.createProject({ name, description, createdBy: user?.id });
  res.json({ success: true, project });
}

export async function getProject(req: Request, res: Response) {
  const project = await projectService.getProject(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json({ success: true, project });
}
