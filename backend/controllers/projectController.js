const projectStore = require('../utils/projectStore');

const listProjects = (req, res) => {
  const projects = projectStore.readProjects();
  res.json(projects);
};

const createProject = (req, res) => {
  const { title, type, area, price, location, image, description } = req.body;
  if (!title || !type || !area || !price || !location) {
    return res.status(400).json({ message: 'Missing required project fields.' });
  }
  const project = projectStore.addProject({ title, type, area, price, location, image, description });
  res.status(201).json(project);
};

const updateProject = (req, res) => {
  const { id } = req.params;
  const project = projectStore.updateProject(id, req.body);
  if (!project) {
    return res.status(404).json({ message: 'Project not found.' });
  }
  res.json(project);
};

const deleteProject = (req, res) => {
  const { id } = req.params;
  const removed = projectStore.removeProject(id);
  if (!removed) {
    return res.status(404).json({ message: 'Project not found.' });
  }
  res.json({ message: 'Project removed successfully.' });
};

module.exports = {
  listProjects,
  createProject,
  updateProject,
  deleteProject
};
