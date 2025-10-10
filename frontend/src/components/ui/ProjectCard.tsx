import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }: any) {
  return (
    <Link to={`/project/${project._id}`} className="project-card">
      <div className="project-title">{project.name}</div>
      <div className="muted">{project.description}</div>
    </Link>
  );
}
