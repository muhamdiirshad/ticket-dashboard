"use strict";
////////////STEP 2 ////////////
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProjects = listProjects;
exports.createProject = createProject;
exports.getProject = getProject;
const Project_1 = __importDefault(require("../models/Project"));
async function listProjects() {
    return Project_1.default.find().populate('tickets').lean();
}
async function createProject(data) {
    const project = await Project_1.default.create({
        name: data.name,
        description: data.description,
        createdBy: data.createdBy,
        members: data.createdBy ? [data.createdBy] : []
    });
    return project;
}
async function getProject(projectId) {
    return Project_1.default.findById(projectId).populate('tickets').lean();
}
