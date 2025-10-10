import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loadProjects, addProject } from '../features/projects/projectsSlice';
import ProjectCard from '../components/ui/ProjectCard';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector(s => s.projects.items);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => { dispatch(loadProjects()); }, []);

  const onCreate = () => {
    if (!name) return;
    dispatch(addProject({ name, description: desc }));
    setName(''); setDesc('');
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="header-row">
          <h2>Projects</h2>
          <div className="create-row">
            <input className="input" placeholder="Project name" value={name} onChange={e => setName(e.target.value)} />
            <input className="input" placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
            <button className="btn" onClick={onCreate}>Create</button>
          </div>
        </div>

        <div className="grid">
          {projects.length === 0
            ? <div className="card">No projects yet — create one.</div>
            : projects.map((p: any) => <ProjectCard key={p._id} project={p} />)}
        </div>
      </div>
    </div>
  );
}
