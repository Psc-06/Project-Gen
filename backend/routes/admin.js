const express = require('express');
const router = express.Router();
const { getAllUsers, updateUserPlan, deleteUser, getAllProjects, getStats, createTemplate } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { isAdmin } = require('../middleware/admin');

router.use(protect, isAdmin);
router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.patch('/users/:id/plan', updateUserPlan);
router.delete('/users/:id', deleteUser);
router.get('/projects', getAllProjects);
router.post('/templates', createTemplate);

module.exports = router;
