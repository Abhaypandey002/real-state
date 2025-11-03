const { Router } = require('express');
const authenticate = require('../middleware/authMiddleware');
const {
  listProjects,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

const router = Router();

router.get('/', listProjects);
router.post('/', authenticate, createProject);
router.put('/:id', authenticate, updateProject);
router.delete('/:id', authenticate, deleteProject);

module.exports = router;
