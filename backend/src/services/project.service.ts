////////////STEP 2 ////////////

import ProjectModel from '../models/Project';

export async function listProjects() {
  return ProjectModel.find().populate('tickets').lean();
}

export async function createProject(data: { name: string; description?: string; createdBy?: string }) {
  const project = await ProjectModel.create({
    name: data.name,
    description: data.description,
    createdBy: data.createdBy,
    members: data.createdBy ? [data.createdBy] : []
  });
  return project;
}

export async function getProject(projectId: string) {
  return ProjectModel.findById(projectId).populate('tickets').lean();
}
