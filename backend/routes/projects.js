const express = require('express');
const router = express.Router();
const { generateProject, getMyProjects, getProject, downloadPDF, downloadPPT, deleteProject } = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.post('/generate', generateProject);
router.get('/my', getMyProjects);
router.get('/:id', getProject);
router.get('/:id/download-pdf', downloadPDF);
router.get('/:id/download-ppt', downloadPPT);
router.delete('/:id', deleteProject);

module.exports = router;
