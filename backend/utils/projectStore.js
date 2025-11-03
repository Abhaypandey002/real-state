const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');

const ensureStore = () => {
  if (!fs.existsSync(config.projectStorePath)) {
    const seedData = [
      {
        id: uuidv4(),
        title: '3BHK Modern Villa',
        type: '3BHK',
        area: '2500 sq.ft.',
        price: '₹85,00,000 onwards',
        location: 'Vesu, Surat',
        image: '/images/villa.jpg',
        description: 'Where comfort meets class in a serene gated community.'
      },
      {
        id: uuidv4(),
        title: '2BHK Riverside Apartment',
        type: '2BHK',
        area: '1450 sq.ft.',
        price: '₹52,00,000 onwards',
        location: 'Adajan, Surat',
        image: '/images/apartment.jpg',
        description: 'Your next chapter begins here with panoramic river views.'
      }
    ];
    fs.writeFileSync(config.projectStorePath, JSON.stringify(seedData, null, 2));
  }
};

const readProjects = () => {
  ensureStore();
  const raw = fs.readFileSync(config.projectStorePath, 'utf-8');
  return JSON.parse(raw);
};

const writeProjects = (projects) => {
  fs.writeFileSync(config.projectStorePath, JSON.stringify(projects, null, 2));
};

const addProject = (data) => {
  const projects = readProjects();
  const project = { id: uuidv4(), ...data };
  projects.push(project);
  writeProjects(projects);
  return project;
};

const updateProject = (id, updates) => {
  const projects = readProjects();
  const index = projects.findIndex((project) => project.id === id);
  if (index === -1) return null;
  projects[index] = { ...projects[index], ...updates };
  writeProjects(projects);
  return projects[index];
};

const removeProject = (id) => {
  const projects = readProjects();
  const filtered = projects.filter((project) => project.id !== id);
  if (filtered.length === projects.length) return false;
  writeProjects(filtered);
  return true;
};

module.exports = {
  readProjects,
  addProject,
  updateProject,
  removeProject
};
