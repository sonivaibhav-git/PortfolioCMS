import React, { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import PropTypes from 'prop-types';

const initialData = {
  projects: [],
  skills: {
    tools: [],
    technologies: {
      frontend: [],
      backend: [],
      database: []
    },
    languages: []
  },
  achievements: []
};

export default function DataForm() {
  const [data, setData] = useState(initialData);
  const [activeSection, setActiveSection] = useState('projects');
  
  const [project, setProject] = useState({
    name: '',
    desc: '',
    githubLink: '',
    viewLink: '',
    imageSrc: ''
  });

  const [achievement, setAchievement] = useState({
    title: '',
    position: '',
    date: '',
    company: ''
  });

  const [tool, setTool] = useState({ name: '', imageSrc: '' });
  const [technology, setTechnology] = useState({ name: '', imageSrc: '' });
  const [techType, setTechType] = useState('frontend');
  const [language, setLanguage] = useState({ name: '', imageSrc: '' });

  const handleAddProject = () => {
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, { ...project, id: crypto.randomUUID() }]
    }));
    setProject({ name: '', desc: '', githubLink: '', viewLink: '', imageSrc: '' });
  };

  const handleAddAchievement = () => {
    setData(prev => ({
      ...prev,
      achievements: [...prev.achievements, achievement]
    }));
    setAchievement({ title: '', position: '', date: '', company: '' });
  };

  const handleAddTool = () => {
    setData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        tools: [...prev.skills.tools, tool]
      }
    }));
    setTool({ name: '', imageSrc: '' });
  };

  const handleAddTechnology = () => {
    setData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        technologies: {
          ...prev.skills.technologies,
          [techType]: [...prev.skills.technologies[techType], technology]
        }
      }
    }));
    setTechnology({ name: '', imageSrc: '' });
  };

  const handleAddLanguage = () => {
    setData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        languages: [...prev.skills.languages, language]
      }
    }));
    setLanguage({ name: '', imageSrc: '' });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Portfolio Data Manager</h1>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              <Download size={20} />
              Export Data
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            {['projects', 'skills', 'achievements'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 rounded-md capitalize ${
                  activeSection === section
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {activeSection === 'projects' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Add Project</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={project.name}
                  onChange={(e) => setProject(prev => ({ ...prev, name: e.target.value }))}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={project.imageSrc}
                  onChange={(e) => setProject(prev => ({ ...prev, imageSrc: e.target.value }))}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="GitHub Link"
                  value={project.githubLink}
                  onChange={(e) => setProject(prev => ({ ...prev, githubLink: e.target.value }))}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="View Link"
                  value={project.viewLink}
                  onChange={(e) => setProject(prev => ({ ...prev, viewLink: e.target.value }))}
                  className="border p-2 rounded"
                />
                <textarea
                  placeholder="Description"
                  value={project.desc}
                  onChange={(e) => setProject(prev => ({ ...prev, desc: e.target.value }))}
                  className="border p-2 rounded col-span-2"
                  rows={3}
                />
              </div>
              <button
                onClick={handleAddProject}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                <Plus size={20} />
                Add Project
              </button>
            </div>
          )}

          {activeSection === 'skills' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Add Tool</h2>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Tool Name"
                    value={tool.name}
                    onChange={(e) => setTool(prev => ({ ...prev, name: e.target.value }))}
                    className="border p-2 rounded flex-1"
                  />
                  <input
                    type="text"
                    placeholder="Tool Image URL"
                    value={tool.imageSrc}
                    onChange={(e) => setTool(prev => ({ ...prev, imageSrc: e.target.value }))}
                    className="border p-2 rounded flex-1"
                  />
                  <button
                    onClick={handleAddTool}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Add Technology</h2>
                <select
                  value={techType}
                  onChange={(e) => setTechType(e.target.value)}
                  className="border p-2 rounded w-full"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="database">Database</option>
                </select>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Technology Name"
                    value={technology.name}
                    onChange={(e) => setTechnology(prev => ({ ...prev, name: e.target.value }))}
                    className="border p-2 rounded flex-1"
                  />
                  <input
                    type="text"
                    placeholder="Technology Image URL"
                    value={technology.imageSrc}
                    onChange={(e) => setTechnology(prev => ({ ...prev, imageSrc: e.target.value }))}
                    className="border p-2 rounded flex-1"
                  />
                  <button
                    onClick={handleAddTechnology}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Add Language</h2>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Language Name"
                    value={language.name}
                    onChange={(e) => setLanguage(prev => ({ ...prev, name: e.target.value }))}
                    className="border p-2 rounded flex-1"
                  />
                  <input
                    type="text"
                    placeholder="Language Image URL"
                    value={language.imageSrc}
                    onChange={(e) => setLanguage(prev => ({ ...prev, imageSrc: e.target.value }))}
                    className="border p-2 rounded flex-1"
                  />
                  <button
                    onClick={handleAddLanguage}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'achievements' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Add Achievement</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={achievement.title}
                  onChange={(e) => setAchievement(prev => ({ ...prev, title: e.target.value }))}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={achievement.position}
                  onChange={(e) => setAchievement(prev => ({ ...prev, position: e.target.value }))}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={achievement.company}
                  onChange={(e) => setAchievement(prev => ({ ...prev, company: e.target.value }))}
                  className="border p-2 rounded"
                />
                <input
                  type="date"
                  value={achievement.date}
                  onChange={(e) => setAchievement(prev => ({ ...prev, date: e.target.value }))}
                  className="border p-2 rounded"
                />
              </div>
              <button
                onClick={handleAddAchievement}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                <Plus size={20} />
                Add Achievement
              </button>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Current Data</h2>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

DataForm.propTypes = {
  // Add prop types if needed
};